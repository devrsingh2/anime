import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnimeApiService {

  constructor(private httpClient: HttpClient) { }

  public getTopAnime() {
    return this.httpClient.get(`https://api.jikan.moe/v4/top/anime?limit=20`);
  }

}
