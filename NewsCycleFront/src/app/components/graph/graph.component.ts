import { Component, NgModule } from '@angular/core';
import {GraphService} from './graph.service';
import {Graph} from './graph';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent {
  title = 'Angular Charts';

  view: [number, number] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  showYAxisLabel = false;
  yAxisLabel = 'Platzierung';
  timeline = true;

  // pie
  showLabels = true;

  // data goes here
  public single: {name: string, series: {name: string, value: number}[]}[] =
    [{name: 'Dummy Data', series: [
      {
        name: '2010',
        value: 7300000
      },
      {
        name: '2011',
        value: 8940000
      }
    ]
  }];
  public graph: Graph | undefined = undefined;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void{
    this.getData();
  }

  getData(): void{
    this.graphService.getData().subscribe(data => this.single = data.data);
    console.log("This took me long enough");
  }
}
