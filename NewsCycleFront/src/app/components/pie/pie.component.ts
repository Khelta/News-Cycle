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
  medium = 'tagesschau';
  date = '2021-04-07';
  moreThan = '20';
  maxWords = '10';

  results: {name: string, value: number}[] = [/*{name: 'Germany', value: 8940000}, {name: 'USA', value: 5000000}*/];
  view: [number, number] = [700, 400];

  // options
  gradient = true;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#255', '#F00', '#FFFF00', '#AAAAAA']
  };

  constructor(private pieService: PieService){}

  ngOnInit(): void{
    this.getData();
  }

  getData(): void{
    const promise = this.pieService.getData(this.medium, this.date, this.moreThan, this.maxWords).then(data => this.results = data.data);
    promise.then(data => this.updateColor());

  }

  updateSlider(): void{

  }

  updateColor(): void{
    this.colorScheme.domain = [];
    let value: string;
    let j = 0;
    const max = this.results[0].value;
    const min = this.results[this.results.length - 1].value;
    for (let i of this.results){
      value = Math.floor(this.mapMinMax(i.value, min, max, 100, 255)).toString(16);
      value = value.length === 1 ? '0' + value : value;

      if (j % 2 === 0){
        value = '#0000' + value;
      }
      else{
        value = '#' + value + '00' + value;
      }
      j += 1;

      this.colorScheme.domain.push(value);
    }
  }

  mapMinMax(input: number, inMin: number, inMax: number, outMin: number, outMax: number): number{
    return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  onMoreThanSliderChange(event: any): void{
    this.moreThan = event;
    this.getData();
  }

  onMaxWordSliderChange(event: any): void{
    this.maxWords = event;
    this.getData();
  }
}
