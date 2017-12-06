import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { environment } from './../../../environments/environment.prod';
import { ISuggestion } from '../../models/suggestion';
import { IUserInfo } from '../../models/user-info';
import { MessageService } from './../message/message.service';
import { SpotifyService } from './../spotify/spotify.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UtilsService } from './../utils/utils.service';
import { user_intent_scrore } from '../../app.constants';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SuggestionsService {

  private userInfo: IUserInfo;
  private suggestionsForUser: ISuggestion[] = [];

  constructor(
    private userInfoService: UserInfoService,
    private utilsService: UtilsService,
    private spotifyService: SpotifyService,
    private http: HttpClient,
    private _messageService: MessageService
  ) { }

  /**
   * This is going to be a very dumb suggestion system. We're going to suggest the user some pre-defined things based on,
   * certain factor.
   * For example:
   * 1. Workout: If the user said true, we'll suggest the user some relaxation techniques, like listening to music.
   *             Or we'll suggest the user to drink more water.
   * 2. Mood: If the user said that the mood was sad, we'll suggest the user to watch some funny youtube videos, or listen to cheerful music.
   * 
   * And so on and so forth.
   * 
   * Each suggestion will have the following:
   * 1. A type: image, video, soundtrack, article, text.
   * 2. A link: That will take the user to the source of the suggestion.
   * 3. A title
   * 4. A subtitle
   * 5. A factor: for which it is a suggestion
   * 
   */

  getSuggestionsForUser() {
    this.userInfo = this.userInfoService.getUserInfo();
    console.log('this.userInfo', this.userInfo);
    let score = this.computeScore();
    let activities = this.suggestActivityForFactor(score);

    this._messageService.addMessage({
      sender: 'BOT',
      message: `Based on my analysis on your response, your mood is ${activities['mood']}. Following are my suggestions for you:`,
      time: new Date().toString()
    });

    let youtubeData =  this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${activities['keywords']}&type=videos&key=${environment.apiKeys.youtubeAPIKey}`)
                           .map(response => this.utilsService.getRelevantYoutubeData(response));
    return this.spotifyService.getAuthToken().map((authToken) => {
      let spotifyData = this.spotifyService.getSuggestedTracks(authToken, activities['keywords']);
      /* .subscribe((tracks) => {
        console.log('Got the tracks as : ', tracks);
      }); */
      return Observable.forkJoin(youtubeData, spotifyData);
    });
  }

  computeScore() {
    let score = 0;
    Object.keys(this.userInfo).forEach((val) => {
      if(user_intent_scrore[val]) {
        score = score + user_intent_scrore[val][this.userInfo[val]];
      }
    });
    return score;
  }

  suggestActivityForFactor(score) {
    const factor = {};
    switch( true ) {
      case ( score >= 25 ):
      factor['mood'] = 'Super Happy';
      factor['keywords'] = 'Happiness, Meditation';
      break;
      case ( score > 15 && score < 25):
      factor['mood'] = 'Active';
      factor['keywords'] = 'Light Fitness Songs: Sounds of Nature & Piano Background Music, Background Music For Cooking';
      break;
      case ( score >= 5 && score < 15):
      factor['mood'] = 'General Meditation';
      factor['keywords'] = 'Music for stress, Anxiety, relaxation, depression, isochronic tones';
      break;
      case ( score < 5 ):
      factor['mood'] = 'Sad';
      factor['keywords'] = 'Overcome sadness, Healing Binaural Rain';
      break;
      // case for sleep
    }
    return factor;
  }

}
