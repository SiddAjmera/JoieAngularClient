import { Injectable } from '@angular/core';

@Injectable()
export class TransformService {

  constructor() { }

  getRelevantYoutubeData(youtubeResponseData) {
    return youtubeResponseData.items.map((video) => {
      let videoInfo = video.snippet;
      return {
        videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        title: videoInfo.title,
        description: videoInfo.description,
        smallTN: videoInfo.thumbnails.default.url,
        mediumTN: videoInfo.thumbnails.medium.url,
        largeTN: videoInfo.thumbnails.high.url
      }
    });
  }

}
