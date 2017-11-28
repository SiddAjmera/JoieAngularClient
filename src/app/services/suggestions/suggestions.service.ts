import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment.prod';
import { ISuggestion } from '../../models/suggestion';
import { TransformService } from './../transform/transform.service';
import { IUserInfo } from '../../models/user-info';
import { UserInfoService } from '../user-info/user-info.service';

@Injectable()
export class SuggestionsService {

  private userInfo: IUserInfo;
  private suggestionsForUser: ISuggestion[] = [];

  constructor(
    private userInfoService: UserInfoService,
    private transformService: TransformService,
    private http: HttpClient
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
    /* this.userInfo = this.userInfoService.getUserInfo();
    Object.keys(this.userInfo).forEach((key) => {
      this.suggestActivityForFactor(key);
    }); */
    this.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=meditation&type=videos&key=${environment.apiKeys.youtubeAPIKey}`)
      .subscribe(response => {
        let videos = this.transformService.getRelevantYoutubeData(response);
      });
  }

  suggestActivityForFactor(factor) {
    switch(factor) {
      case 'FOOD': //suggest something related to food
      case 'FRIEND': //suggest something related to friend
      case 'WORKOUT': //suggest something related to workout
      case 'SLEEP': //suggest something related to sleep
      case 'DRINKS': //suggest something related to drinks
      case 'EMOTION': //suggest something related to emotions
      case 'DAY': //suggest something related to day
    }
  }

}
