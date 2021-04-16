import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Graph} from './graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private baseUrl = 'http://127.0.0.1:8000/api/topTenSevenDays/';

  constructor(private http: HttpClient) {
  }

  getData(medium: string): Observable<Graph> {
    // const graph: Graph = {data: [{name: 'Deutschland', series: [{name: '1', value: 10}, {name: '2', value: 9}, {name: '3', value: 11}]}]};
    // return of(graph);
    const apiURL = this.baseUrl + medium + '/';
    return this.http.get<Graph>(apiURL, {observe: 'body', responseType: 'json'});
  }
}
