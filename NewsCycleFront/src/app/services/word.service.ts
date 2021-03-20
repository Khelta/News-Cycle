import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Word} from "../models/word.model";

const baseUrl = 'http://localhost:8000/api/test'

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  //getID(id: any): Observable<Word>{
  //  console.log(this.http.get(`${baseUrl}`))
  //  return this.http.get(`${baseUrl}`)
  //}
}
