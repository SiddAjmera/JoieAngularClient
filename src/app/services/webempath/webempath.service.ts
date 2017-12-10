import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class WebempathService {

  apiUrl: string = 'https://api.webempath.net/v2/analyzeWav';
  // apiUrl: string = 'https://ss1.coressl.jp/emo.geo.jp/empathwav/analyze/dfjkhg48JKHsdkj398kKJ398dkjjksdfggj39DJ';
  
    constructor(private http: HttpClient) {}
  
    getUserEmotion(formData) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'multipart/form-data');
      return this.http.post(this.apiUrl, formData);
    }

}
