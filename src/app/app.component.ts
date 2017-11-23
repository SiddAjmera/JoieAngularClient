/// <reference path="../../node_modules/@types/tracking/index.d.ts"/>

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Welcome to Joie!';
  subTitle = 'I\'m your very own mindfulness and mental wellbeing instructor! ¯\\_(ツ)_/¯';
  context;
  videoNativeElement;
  canvasNativeElement;

  @ViewChild('userVideoStream') userVideoStream;
  @ViewChild('canvasToRenderUserImage') canvasToRenderUserImage;

  constraints = {
    video: true,
  };

  ngOnInit() {
    this.videoNativeElement = <HTMLVideoElement>this.userVideoStream.nativeElement;
    this.canvasNativeElement = <HTMLCanvasElement>this.canvasToRenderUserImage.nativeElement;
    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.videoNativeElement.srcObject = stream;
    });
    this.context = this.canvasNativeElement.getContext('2d');
    
    let tracker = new tracking.ObjectTracker(['face']);
    tracking.track('#userVideoStream', tracker);
    tracker.on('track', event => {
      if(event.data.length > 0) this.captureUserImage();
    });

  }

  captureUserImage() {
    this.context.drawImage(
      this.userVideoStream.nativeElement, 
      0, 
      0, 
      this.canvasNativeElement.width, 
      this.canvasNativeElement.height
    );
    // this.videoNativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }
}
