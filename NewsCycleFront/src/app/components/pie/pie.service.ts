import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pie} from './pie';

@Injectable({
  providedIn: 'root'
})
export class PieService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private mapCache: Map<string, Promise<Pie>> = new Map<string, Promise<Pie>>();

  constructor(private http: HttpClient) { }

  getData(medium: string, date: string, moreThan: string, maxWords: string, wordTypes: string): Promise<Pie> | undefined {

    const apiURL = this.baseUrl + 'dataMediumDate/'
      + medium + '/'
      + date + '/'
      + moreThan + '/'
      + maxWords + '/'
      + wordTypes + '/';
    if (!this.mapCache.has(apiURL)){
      this.mapCache.set(apiURL, this.http.get<Pie>(apiURL, {observe: 'body', responseType: 'json'}).toPromise());
    }
    return this.mapCache.get(apiURL);
  }

  getWordTypes(): Promise<{data: {type: string}[]}> {
    const apiURL = this.baseUrl + 'wordtypes/';
    return this.http.get<{data: {type: string}[]}>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }
}
