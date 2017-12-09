import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class BeyondVerbalService {

  accessToken: string;
  recordingId: string;

  constructor(private http: HttpClient) { }

  authenticate() {
    let url = 'https://token.beyondverbal.com/token';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let formData = `grant_type=client_credentials&apiKey=${environment.apiKeys.beyondVerbal}`;
    return this.http.post(url, formData, { headers })
               .map(accessTokenResponse => {
                  this.accessToken = accessTokenResponse['access_token'];
                  return this.accessToken;
               });
  }

  startSession() {
    let url = 'https://apiv3.beyondverbal.com/v3/recording/start';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${this.accessToken}`);
    let body = {
      "dataFormat": {
        "type": "WAV"
      },
      "displayLang": "en-us"
    };
    return this.http.post(url, body, {headers: headers})
               .map(sessionData => {
                  this.recordingId = sessionData['recordingId'];
                  return this.recordingId;
                });
  }

  sendUpStream(blob) {
    let url = `https://apiv3.beyondverbal.com/v3/recording/${this.recordingId}`;
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${this.accessToken}`);
    return this.http.post(url, blob, {headers: headers});
  }

}
