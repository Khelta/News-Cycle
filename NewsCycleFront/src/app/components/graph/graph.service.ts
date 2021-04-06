import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Graph} from './graph';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private baseUrl = 'http://127.0.0.1:8000/api/topTenSevenDays/tagesschau/';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<Graph> {
    // const graph: Graph = {data: [{name: 'Deutschland', series: [{name: '1', value: 10}, {name: '2', value: 9}, {name: '3', value: 11}]}]};
    // return of(graph);
    return this.http.get<Graph>(this.baseUrl, {observe: 'body', responseType: 'json'});
  }
}
