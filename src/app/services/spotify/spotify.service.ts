import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class SpotifyService {

  constructor(private _httpClient: HttpClient) { }

  getAuthToken() {
    let url = 'http://localhost:3000/auth';
    let body = {
      clientId: environment.apiKeys.spotifyClientId,
      clientSecret: environment.apiKeys.spotifyClientSecret
    };
    return this._httpClient.post(url, body).map(response => response['access_token']);
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

  getSuggestedTracks() {
    this.getAuthToken().subscribe(accessToken => {
      let url = 'https://api.spotify.com/v1/search?type=album,artist,playlist,track&q=Mood Booster';
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${accessToken}`);
      this._httpClient.get(url, { headers })
        .subscribe(response => {
          console.log(response);
          let modifiedTracks = response['tracks']['items'].map(track => {
            let thumbnailsArray = track.album.images.map(image => image.url);
            return {
              name: track.name,
              preview: track.preview_url,
              deepLink: track.uri,
              externalUrl: track.external_urls.spotify,
              largeTN: thumbnailsArray[0],
              mediumTN: thumbnailsArray[1],
              smallTN: thumbnailsArray[2]
            }
          });
        return modifiedTracks;
      });
    });
  }

}
