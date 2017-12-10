import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { AudioUtilService } from './../../services/audio-util/audio-util.service';
import { BeyondVerbalService } from '../../services/beyond-verbal/beyond-verbal.service';
import { DialogFlowClient } from '../../dialog-flow/dialog-flow.client';
import { environment } from './../../../environments/environment.prod';
import { MessageService } from '../../services/message/message.service';
import { IUserInfo } from '../../models/user-info';
import { UserInfoService } from './../../services/user-info/user-info.service';
import { WebempathService } from './../../services/webempath/webempath.service';
import { IMessage } from '../../models/message';
import { UtilsService } from '../../services/utils/utils.service';
import { WindowService } from './../../services/window/window.service';
import { SuggestionsService } from './../../services/suggestions/suggestions.service';
import { RecorderService } from './../../services/recorder/recorder.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recognition; recorder;
  messages: IMessage[] = [];
  userInfo: IUserInfo;
  notification;
  textMessage: string = '';
  suggestions = [];
  dialogEndStatus = false;
  userDenied: boolean;
  window; navigator; audioContext; analyser; audioSupport; localStream; getUserMedia; node;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  constructor(
    private ref: ChangeDetectorRef, 
    private webEmpath: WebempathService, 
    private beyondVerbal: BeyondVerbalService,
    private router: Router,
    private userInfoService: UserInfoService,
    private suggestionsService: SuggestionsService,
    private messageService: MessageService,
    private zone: NgZone,
    private utils: UtilsService,
    private _window: WindowService,
    private _audioUtil: AudioUtilService,
    private _recorderService: RecorderService
  ) { 
    this.window = this._window.nativeWindow;
    this.navigator = this._window.nativeNavigator;
  }

  ngOnInit() {
  //  this.userInfo = this.userInfoService.getUserInfo();
    this.recognition = new this.window.webkitSpeechRecognition();
    this.window.AudioContext = this.window.AudioContext || this.window.webkitAudioContext;
    this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.mozGetUserMedia || this.navigator.msGetUserMedia;
    this.audioContext = new AudioContext;
    this.analyser = this.audioContext.createAnalyser();
    this.notification = new Audio('../../../assets/google_now_tone.mp3');
    this._recorderService.init.call(this);
   // this.suggestionsService.getSuggestionsForUser();
    this.messages = this.messageService.getMessages();
    this.messageService.messagesUpdated.subscribe(messages => {
      this.messages = messages;
    });
    if(this.messageService.getDialogEndStatus()) {
      this.suggestionsService.getSuggestionsForUser()
        .subscribe(videos => {
          // setting end status to hide chat box;
          this.dialogEndStatus = true;
          videos.subscribe(suggestions => {
            this.suggestions = this.utils.shuffleSuggestions(suggestions[0].concat(suggestions[1]));
            this.scrollToBottom();
          });
        });
    }
  }

  analyzeVoice() {
    this.navigator.getUserMedia(
      {video: false, audio: true},
      stream => {
        this.localStream = stream;
        let input = this.audioContext.createMediaStreamSource(stream);
        this.recorder = new this.window.Recorder(input);
        input.connect(this.analyser);
        this.recorder.record();
      },
      (e) => {
        alert("Voice input is not available.");
      }
    );
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  startRecognition() {
    if(!this.utils.isMobile()) this.notification.play();
    this.recognition.start();
    // this.analyzeVoice();
    this.recognition.onresult = event => {
      // this.recorder.stop();
      // this.recorder.exportWAV((blob) => {
      //   console.log('Got blob as : ', blob);
      //   let formData: FormData = new FormData();
      //   formData.append('apikey', environment.apiKeys.webEmpath);
      //   formData.append('wav', blob);
      //   /* this.webEmpath.getUserEmotion(formData).subscribe(response => {
      //     console.log('Got response as: ', response);
      //   }); */
      //   this.beyondVerbal.authenticate().subscribe(beyondVerbalAccessToken => {
      //     this.beyondVerbal.startSession().subscribe(beyondVerbalSessionId => {
      //       let reader = new FileReader();
      //       reader.readAsArrayBuffer(blob);
      //       reader.onload = (e) => {
      //         this.beyondVerbal.sendUpStream(e.target['result']).subscribe(data => {
      //           console.log('Data from Beyond Verbal: ', data);
      //         });
      //       };
      //     });
      //   });
      // }, 'audio/wav');
      this.queryDialogFlow(event.results[0][0].transcript);
    }
  }

  queryDialogFlow(userMessage) {
    this.textMessage = '';
    this.composeMessageObject(userMessage, 'USER');
    DialogFlowClient.textRequest(userMessage).then(response => {
      let dialogFlowResponse = response.result;
      if(dialogFlowResponse.action === 'get.user.info') {
        const userInfo = dialogFlowResponse['parameters'];
        this.userInfoService.setUserInfo(userInfo);
      }
      if(dialogFlowResponse['parameters'] && dialogFlowResponse['parameters']['permission'] === 'true') {
        dialogFlowResponse.fulfillment['speech'] = 'Great! I\'ll just click a snap of you, analyze your mood and then suggest you somethings!';
        this.messageService.setDialogEndStatus(true);
      } else if(dialogFlowResponse['parameters'] && dialogFlowResponse['parameters']['permission'] === 'false') {
        dialogFlowResponse.fulfillment['speech'] = 'Okay. No issues! I\'ll analyze your mood with whatever I have and then suggest you somethings!';
        this.messageService.setDialogEndStatus(true);
        this.userDenied = true;
      }
      let botSaid = dialogFlowResponse.fulfillment['speech'];
      this.speakIt(botSaid);
      this.composeMessageObject(botSaid, 'BOT');
      if(!this.messageService.getDialogEndStatus()) this.ref.detectChanges();
    });
  }

  speakIt(botSaid) {
    let msg = new this.window.SpeechSynthesisUtterance(botSaid);
    this.window.speechSynthesis.speak(msg);
    msg.onend = (event) => this.processBotResponse();
    msg.onerror = (event) => this.processBotResponse();
  }

  processBotResponse() {
    if(this.messageService.getDialogEndStatus()) {
      if(!this.userDenied) this.zone.run(() => this.router.navigate(['/emotion']));
      else {
        this.suggestionsService.getSuggestionsForUser()
          .subscribe(videos => {
            // setting end status to hide chat box;
            this.dialogEndStatus = true;
            videos.subscribe(suggestions => {
              this.suggestions = this.utils.shuffleSuggestions(suggestions[0].concat(suggestions[1]));
              this.ref.detectChanges();
            });
          });
      }
    } else this.startRecognition();
  }

  composeMessageObject(messageText, sender) {
    this.messageService.addMessage({
      time: new Date().toString(),
      message: messageText,
      sender: sender
    });
    this.ref.detectChanges();
    this.scrollToBottom();
  }
}
