import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class SpotifyService {

  apiBase: string = 'https://accounts.spotify.com/api/token';

  constructor(private _httpClient: HttpClient) { }

  getAuthToken() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Basic ${btoa(environment.apiKeys.spotifyClientId + ':' + environment.apiKeys.spotifyClientSecret)}`);
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    let body = 'grant_type=client_credentials';
    
    return this._httpClient.post(this.apiBase, body, { headers }).map(response => response['access_token']);
  }

  getCategories() {
    this.getAuthToken().subscribe(accessToken => {
      let url = 'https://api.spotify.com/v1/browse/categories?limit=50';
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
      this._httpClient.get(url, { headers }).map(response => {
        console.log(response);
      });
    });
  }

}
