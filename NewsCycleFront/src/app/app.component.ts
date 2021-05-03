import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'News Cycle';

  @ViewChild('sidenav') sidenav: MatSidenav;
  navList = [['Worthäufigkeit', './pie'], ['Graphen', './graph'], ['Update', './update']];



  close(): void {
    this.sidenav.close();
  }

  constructor() {
    // @ts-ignore
    this.sidenav = MatSidenav;
  }
}
