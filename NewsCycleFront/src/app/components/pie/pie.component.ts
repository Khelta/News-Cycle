import {Component, Input, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatInputModule} from '@angular/material/input';
import {Pie} from './pie';
import {PieService} from './pie.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent {
  @Input() medium = 'tagesschau';
  @Input() date = '2021-04-07';
  @Input() moreThan = '20';

  results: {name: string, value: number}[] = [
  {
    name: 'Germany',
    value: 8940000
  },
  {
    name: 'USA',
    value: 5000000
  }
];
  view: [number, number] = [700, 400];

  // options
  gradient = true;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private pieService: PieService){}

  ngOnInit(): void{
    this.getData();
  }

  getData(): void{
    this.pieService.getData(this.medium, this.date, this.moreThan).subscribe(data => this.results = data.data);
  }

  onSliderChange(event: any): void{
    console.log(event);
    this.moreThan = event;
    this.getData();
  }
}
