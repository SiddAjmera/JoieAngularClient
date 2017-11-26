import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class BeyondVerbalService {

  private accessToken: string;
  file: File;

  constructor(private http: HttpClient) { }

  authenticate(file) {
    this.file = file;
    let url = 'https://token.beyondverbal.com/token';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    let formData: FormData = new FormData();
    formData.append('grant_type', 'client_credentials');
    formData.append('apiKey', environment.apiKeys.beyondVerbal);
    return this.http.post(url, formData, { headers });
  }

  startSession() {
    let url = 'https://apiv3.beyondverbal.com/v3/recording/start';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', this.accessToken);
    let body = {
      "dataFormat": {
        "type": "WAV"
      },
      "displayLang": "en-us"
    };
    return this.http.post(url, body, {headers: headers});
  }

  sendUpStream(sessionId) {
    let url = `https://apiv3.beyondverbal.com/v3/recording/${sessionId}`;
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Authorization', this.accessToken);
    return this.http.post(url, this.file, {headers: headers});
  }

}
