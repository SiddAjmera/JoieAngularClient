import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { BeyondVerbalService } from '../../services/beyond-verbal/beyond-verbal.service';
import { DialogFlowClient } from '../../dialog-flow/dialog-flow.client';
import { environment } from './../../../environments/environment.prod';
import { UserInfo } from './../../models/user-info/user-info';
import { WebempathService } from './../../services/webempath/webempath.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recognition; recorder;
  messages: string[] = [];
  userInfo: UserInfo;
  notification;
  constructor(
    private ref: ChangeDetectorRef, 
    private webEmpath: WebempathService, 
    private beyondVerbal: BeyondVerbalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recognition = new (<any>window).webkitSpeechRecognition();
    this.notification = new Audio('../../../assets/google_now_tone.mp3');
    // this.analyzeVoice();
  }

  analyzeVoice() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      console.log('Got media stream as : ', stream);
      // store streaming data chunks in array
      const chunks = [];
      // create media recorder instance to initialize recording
      this.recorder = new (<any>window).MediaRecorder(stream, {
        audioBitsPerSecond: 176000
      });
      // function to be called when data is received
      this.recorder.ondataavailable = e => {
        // add stream data to chunks
        chunks.push(e.data);
        // if recorder is 'inactive' then recording has finished
        if (this.recorder.state == 'inactive') {
          // convert stream data chunks to a 'webm' audio format as a blob
          const blob = new Blob(chunks, { type: 'audio/wav' });
          // convert blob to URL so it can be assigned to a audio src attribute
          console.log('Got blob as : ', blob);

          let formData: FormData = new FormData();
          formData.append('apikey', environment.apiKeys.webEmpath);
          formData.append('wav', blob);
          this.webEmpath.getUserEmotion(formData).subscribe(response => {
            console.log('Got response as: ', response);
          });
          /* this.beyondVerbal.authenticate(blob).subscribe(responseFromBeyondVerbal => {
            console.log('Response from BeyondVerbal: ', blob);
          }); */

        }
      };
    });
  }

  startRecognition() {
    this.notification.play();
    this.recognition.start();
    // this.recorder.start();
    this.recognition.onresult = event => {
      // this.recorder.stop();
      let userSaid = event.results[0][0].transcript;
      this.messages.push(userSaid);
      this.ref.detectChanges();
      DialogFlowClient.textRequest(userSaid).then(response => {
        let dialogFlowResponse = response.result;
        if(dialogFlowResponse.action === 'get.user.info') {
          this.userInfo = dialogFlowResponse['parameters'];
          console.log(this.userInfo);
        }
        if(dialogFlowResponse['parameters'] && dialogFlowResponse['parameters']['permission'] === 'true') {
          this.router.navigate(['/emotion']);
        }
        let botSaid = dialogFlowResponse.fulfillment['speech'];
        this.speakIt(botSaid);
        this.messages.push(botSaid);
        this.ref.detectChanges();
        console.log(this.messages);
      });
    }
  }

  speakIt(botSaid) {
    let msg = new SpeechSynthesisUtterance(botSaid);
    (<any>window).speechSynthesis.speak(msg);
    msg.onend = (event) => {
      this.startRecognition();
    }
  }
}
