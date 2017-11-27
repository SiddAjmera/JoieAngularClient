import { Component, OnInit, ViewChild } from '@angular/core';
import 'tracking/build/tracking';
import 'tracking/build/data/face';

import { EmotionService } from './../../services/emotion/emotion.service';

declare var window: any;
declare var tracking: any;
@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit {

  constraints = { video: true };
  context; videoNativeElement; canvasNativeElement; userImage; userPrimaryEmotion; userSecondaryEmotion;
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
      if(emotionData['length'] > 0) {
        let userEmotions = emotionData[0].scores;
        let emotionsArray = Object.keys(userEmotions);
        let originalEmotionValues = Object.values(userEmotions);
        let emotionValues = originalEmotionValues.slice();
        let maximum = Math.max.apply(null, originalEmotionValues); // get the max of the array
        this.userPrimaryEmotion = emotionsArray[originalEmotionValues.indexOf(maximum)];
        emotionValues.splice(originalEmotionValues.indexOf(maximum), 1); // remove max from the array
        let secondMax = Math.max.apply(null, emotionValues); // get the 2nd max
        this.userSecondaryEmotion = emotionsArray[originalEmotionValues.indexOf(secondMax)];
      } else {
        this.ngOnInit();
      }
    });
  }

  stopVideoStream() {
    this.videoNativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }

}
