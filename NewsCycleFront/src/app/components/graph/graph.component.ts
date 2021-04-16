import {Component, Input, NgModule} from '@angular/core';
import * as shape from 'd3-shape';
import {GraphService} from './graph.service';
import {Graph} from './graph';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})

export class GraphComponent {
  @Input() medium = 'tagesschau';
  @Input() date = '2021-04-07';
  @Input() moreThan = '20';

  title = 'Angular Charts';

  view: [number, number] = [600, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Datum';
  showYAxisLabel = true;
  yAxisLabel = 'Platzierung';
  timeline = true;
  legendTitle = 'Legende';
  curve = shape.curveBasis;

  // pie
  showLabels = true;

  // data goes here
  public results: { name: string; series: { name: string; value: number; }[]; }[] | undefined;

  constructor(private graphService: GraphService) {}

  ngOnInit(): void{
    this.getData();
  }

  getData(): void{
    this.graphService.getData(this.medium).subscribe(data => this.results = data.data);
    console.log('This took me long enough');
  }
}
