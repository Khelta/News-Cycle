import {Component} from '@angular/core';
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
  types: string[] = [];
  typesToggled: Map<string, boolean> = new Map<string, boolean>();
  currentTypes = 'NOUN';

  results: { name: string, value: number }[] = [/*{name: 'Germany', value: 8940000}, {name: 'USA', value: 5000000}*/];
  view: [number, number] = [700, 400];

  // options
  gradient = true;
  showLegend = false;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#f0f', '#F00', '#FFFF00', '#AAAAAA']
  };

  constructor(private pieService: PieService) {
  }

  ngOnInit(): void {
    this.initWordtypes();
    this.getData();
  }

  getData(): void {
    const promise = this.pieService.getData(this.medium, this.date, this.moreThan, this.maxWords, this.currentTypes)
      .then(data => this.results = data.data);
    promise.then(() => this.updateColor());
  }

  initWordtypes(): void {
    this.pieService.getWordTypes().then(data => {
      for (const entry of data.data) {
        this.types.push(entry.type);
      }
    })
      .then(() => {
        for (const entry of this.types) {
          this.typesToggled.set(entry, false);
        }
      });
  }

  getWordtypeParameter(): string {
    let result = '';
    for (const entry of this.typesToggled) {
      if (entry[1]) {
        result = result + entry[0] + '+';
      }
    }
    return result;
  }

  updateColor(): void {
    this.colorScheme.domain = [];
    let value: string;
    let j = 0;
    const max = this.results[0].value;
    const min = this.results[this.results.length - 1].value;
    for (let i of this.results) {
      value = Math.floor(this.mapMinMax(i.value, min, max, 100, 255)).toString(16);
      value = value.length === 1 ? '0' + value : value;

      if (j % 2 === 0) {
        value = '#0000' + value;
      } else {
        value = '#' + value + '00' + value;
      }
      j += 1;

      this.colorScheme.domain.push(value);
    }
  }

  mapMinMax(input: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return (input - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  onMoreThanSliderChange(event: any): void {
    this.moreThan = event;
    this.getData();
  }

  onMaxWordSliderChange(event: any): void {
    this.maxWords = event;
    this.getData();
  }

  updateWordTypeToggle(event: any): void {
    const id = event.source.id;
    this.typesToggled.set(id, !this.typesToggled.get(id));
    const wordtypeParameter = this.getWordtypeParameter();
    if (wordtypeParameter !== '') {
      this.currentTypes = wordtypeParameter;
      this.getData();
    }
  }
}
