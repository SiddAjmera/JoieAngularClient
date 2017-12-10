import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class SpotifyService {

  constructor(private _httpClient: HttpClient) { }

  getAuthToken() {
    let url = 'https://spotify-node-auth.herokuapp.com/auth';
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

  getSuggestedTracks(accessToken, query) {
    let url = `https://api.spotify.com/v1/search?type=track&q=${query}`;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${accessToken}`);
    return this._httpClient.get(url, { headers })
      .map(response => {
        return response['tracks']['items'].map(track => {
          let thumbnailsArray = track.album.images.map(image => image.url);
          return {
            source: 'SPOTIFY',
            title: track.name,
            preview: track.preview_url,
            deepLink: `https://open.spotify.com/embed?uri=${track.uri}&theme=white&view=coverart`,
            externalUrl: track.external_urls.spotify,
            largeTN: thumbnailsArray[0],
            mediumTN: thumbnailsArray[1],
            smallTN: thumbnailsArray[2]
          }
        });
    });
  }

}
