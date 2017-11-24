import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { ApiAiClient } from "api-ai-javascript";

import { WebempathService } from './../../services/webempath/webempath.service';

const client = new ApiAiClient({ accessToken: 'you-developer-api-key' });

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recognition;
  messages: string[] = [];
  constructor(private ref: ChangeDetectorRef, private webEmpath: WebempathService) { }

  ngOnInit() {
    this.recognition = new (<any>window).webkitSpeechRecognition();
  }

  startRecognition() {
    this.recognition.start();
    this.recognition.onresult = event => {
      let userSaid = event.results[0][0].transcript;
      this.messages.push(userSaid);
      this.ref.detectChanges();
      client.textRequest(userSaid).then(response => {
        let botSaid = response.result.fulfillment['speech'];
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
  }

  userInputChanged(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('apikey', 'you-api-key');
      formData.append('wav', file);
      this.webEmpath.getUserEmotion(formData).subscribe(response => {
        console.log('Got response as: ', response);
      });
    }
  }
}
