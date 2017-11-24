
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmotionService } from './services/emotion/emotion.service';
import 'tracking/build/tracking';
import 'tracking/build/data/face';

declare var window: any;
declare var tracking: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to Joie!';
  subTitle = 'I\'m your very own mindfulness and mental wellbeing instructor! ¯\\_(ツ)_/¯';
  constraints = { video: true };
  context; videoNativeElement; canvasNativeElement; userImage; userCurrentEmotion;
  @ViewChild('userVideoStream') userVideoStream;
  @ViewChild('canvasToRenderUserImage') canvasToRenderUserImage;

  constructor(private emotionService: EmotionService) { }

  ngOnInit() {
    this.videoNativeElement = <HTMLVideoElement>this.userVideoStream.nativeElement;
    this.canvasNativeElement = <HTMLCanvasElement>this.canvasToRenderUserImage.nativeElement;
    navigator.mediaDevices.getUserMedia(this.constraints).then(stream => {
      this.videoNativeElement.srcObject = stream;
    });
    this.context = this.canvasNativeElement.getContext('2d');

    const tracker = new tracking.ObjectTracker('face');

    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);
    tracking.track('#userVideoStream', tracker);
    tracker.on('track', event => {
      if (event.data.length > 0) this.captureUserImage();
    });
  }

  captureUserImage() {
    this.context.drawImage(this.userVideoStream.nativeElement, 0, 0, this.canvasNativeElement.width, this.canvasNativeElement.height);
    this.stopVideoStream()
    this.userImage = this.canvasNativeElement.toDataURL('image/jpeg', 1);
    this.emotionService.getUserEmotion(this.userImage).subscribe(emotionData => {
      let userEmotions = emotionData[0].scores;
      let emotionsArray = Object.keys(userEmotions);
      let emotionValues = Object.values(userEmotions);
      this.userCurrentEmotion = emotionsArray[emotionValues.indexOf(Math.max(...emotionValues))];
    });
  }

  stopVideoStream() {
    this.videoNativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }
}