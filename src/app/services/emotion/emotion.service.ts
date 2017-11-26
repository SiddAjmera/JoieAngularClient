import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class EmotionService {

  apiUrl: string = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';

  constructor(private http: HttpClient) {}

  getUserEmotion(userImageBlob) {
    let headers = new HttpHeaders();
    headers = headers.set('Ocp-Apim-Subscription-Key', environment.apiKeys.emotion);
    headers = headers.set('Content-Type', 'application/octet-stream');
    return this.http.post(this.apiUrl, this.makeBlob(userImageBlob), { headers: headers });
  }

  makeBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
      var parts = dataURL.split(',');
      var contentType = parts[0].split(':')[1];
      var raw = decodeURIComponent(parts[1]);
      return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

}
