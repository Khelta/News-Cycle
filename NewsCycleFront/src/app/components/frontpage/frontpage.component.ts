import { Component, OnInit } from '@angular/core';
import {Word} from "../../models/word.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  //testFunction(): Observable<any>{
  //  return this.wordService.getID(1);
  //}
}
