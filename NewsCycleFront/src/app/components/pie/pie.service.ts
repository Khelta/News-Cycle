import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Pie} from './pie';

@Injectable({
  providedIn: 'root'
})
export class PieService {
  private baseUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getData(medium: string, date: string, moreThan: string, maxWords: string, wordTypes: string): Promise<Pie> {

    const apiURL = this.baseUrl + 'dataMediumDate/'
      + medium + '/'
      + date + '/'
      + moreThan + '/'
      + maxWords + '/'
      + wordTypes + '/';
    return this.http.get<Pie>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  getWordTypes(): Promise<{data: {type: string}[]}> {
    const apiURL = this.baseUrl + 'wordtypes/';
    return this.http.get<{data: {type: string}[]}>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }
}
