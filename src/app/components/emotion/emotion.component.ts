import { Component, OnInit, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'tracking/build/tracking';
import 'tracking/build/data/face';

import { EmotionService } from './../../services/emotion/emotion.service';
import { IUserInfo } from './../../models/user-info';
import { MessageService } from '../../services/message/message.service';
import { UserInfoService } from './../../services/user-info/user-info.service';

declare var window: any;
declare var tracking: any;
@Component({
  selector: 'app-emotion',
  templateUrl: './emotion.component.html',
  styleUrls: ['./emotion.component.css']
})
export class EmotionComponent implements OnInit, AfterViewInit {

  context; videoNativeElement; canvasNativeElement; userImage; userPrimaryEmotion; userSecondaryEmotion;
  retryCount: number = 0;
  @ViewChild('userVideoStream') userVideoStream;
  @ViewChild('canvasToRenderUserImage') canvasToRenderUserImage;

  constructor(
    private emotionService: EmotionService, 
    private route: ActivatedRoute, 
    private messageService: MessageService,
    private router: Router,
    private zone: NgZone,
    private _userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoNativeElement = <HTMLVideoElement>this.userVideoStream.nativeElement;
      this.canvasNativeElement = <HTMLCanvasElement>this.canvasToRenderUserImage.nativeElement;
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
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
    });
  }

  ngAfterViewInit() {
    
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
        let userInfo: IUserInfo = this._userInfoService.getUserInfo();
        userInfo.primaryEmotion = this.userPrimaryEmotion;
        userInfo.secondaryEmotion = this.userSecondaryEmotion;
        this._userInfoService.setUserInfo(userInfo);
        // this.zone.run(() => this.router.navigate(['/chat']));
        this.router.navigate(['/chat']);
      } else {
        if(this.retryCount > 3) {
          this.router.navigate(['/chat']);
        } else {
          this.retryCount++;
          this.ngOnInit();
        }
      }
    });
  }

  stopVideoStream() {
    this.videoNativeElement.srcObject.getVideoTracks().forEach(track => track.stop());
  }

}
