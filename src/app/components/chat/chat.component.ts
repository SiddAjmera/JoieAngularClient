import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  recognition;
  messages: string[] = [];
  constructor() { }

  ngOnInit() {
    this.recognition = new (<any>window).webkitSpeechRecognition();
  }

  startRecognition() {
    this.recognition.start();
    this.recognition.onresult = event => { 
      let userSaid = event.results[0][0].transcript;
      this.messages.push(userSaid);
    }
  }

}
