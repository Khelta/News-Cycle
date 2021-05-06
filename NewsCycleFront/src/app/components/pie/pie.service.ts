import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Medium, Word, Wordcount, WordType} from './interfaces';


@Injectable({
  providedIn: 'root'
})
export class PieService {
  private baseUrl = 'http://127.0.0.1:8000/api/';
  private mapWordcountCache: Map<string, Promise<Wordcount[]>> = new Map<string, Promise<Wordcount[]>>();
  private mapWordCache: Map<string, Observable<Word[]>> = new Map<string, Observable<Word[]>>();

  constructor(private http: HttpClient) {
  }

  getData(medium: string, date: string, moreThan: string, maxWords: string, wordTypes: string): Promise<Wordcount[]> | undefined {

    const apiURL = this.baseUrl + 'dataMediumDate/'
      + medium + '/'
      + date + '/'
      + moreThan + '/'
      + maxWords + '/'
      + wordTypes + '/';
    if (!this.mapWordcountCache.has(apiURL)) {
      this.mapWordcountCache.set(apiURL, this.http.get<Wordcount[]>(apiURL, {
        observe: 'body',
        responseType: 'json'
      }).toPromise());
    }
    return this.mapWordcountCache.get(apiURL);
  }

  getWordTypes(): Promise<WordType[]> {
    const apiURL = this.baseUrl + 'wordtypes/';
    return this.http.get<WordType[]>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  getMedia(): Promise<Medium[]> {
    const apiURL = this.baseUrl + 'media/';
    return this.http.get<Medium[]>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  updateMedia(mediaName: string): Promise<{ details: string }> {
    const apiURL = this.baseUrl + 'media/update/' + mediaName + '/';
    return this.http.get<{ details: string }>(apiURL, {observe: 'body', responseType: 'json'}).toPromise();
  }

  getWords(str: string): Observable<Word[]> | undefined {
    if (str === '') {
      return new Observable<Word[]>();
    }

    const apiURL = this.baseUrl + 'words/string/' + str + '/5/';
    if (!this.mapWordCache.has(apiURL)) {
      this.mapWordCache.set(apiURL,
        this.http.get<Word[]>(apiURL, {observe: 'body', responseType: 'json'}));
    }

    return this.mapWordCache.get(apiURL);
  }
}
