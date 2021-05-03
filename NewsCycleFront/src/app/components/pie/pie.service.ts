import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Wordcount, Medium, WordType} from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class PieService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private mapCache: Map<string, Promise<Wordcount[]>> = new Map<string, Promise<Wordcount[]>>();

  constructor(private http: HttpClient) { }

  getData(medium: string, date: string, moreThan: string, maxWords: string, wordTypes: string): Promise<Wordcount[]> | undefined {

    const apiURL = this.baseUrl + 'dataMediumDate/'
      + medium + '/'
      + date + '/'
      + moreThan + '/'
      + maxWords + '/'
      + wordTypes + '/';
    if (!this.mapCache.has(apiURL)){
      this.mapCache.set(apiURL, this.http.get<Wordcount[]>(apiURL, {observe: 'body', responseType: 'json'}).toPromise());
    }
    return this.mapCache.get(apiURL);
  }

  getWordTypes(): Promise<WordType[]> {
    const apiURL = this.baseUrl + 'wordtypes/';
    return this.http.get<WordType[]>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  getMedia(): Promise<Medium[]>{
    const apiURL = this.baseUrl + 'media/';
    return this.http.get<Medium[]>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  updateMedia(mediaName: string): Promise<{details: string}>{
    const apiURL = this.baseUrl + 'media/update/' + mediaName + '/';
    return this.http.get<{details: string}>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }
}
