import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PieService} from '../pie/pie.service';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]> = new Observable();
  currentSearch = 'test';

  constructor(private pieService: PieService) {
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (value === '') {
      return [];
    }

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onInputChange(event: any): void {
    this.currentSearch = event.target.value;
    console.log(this.currentSearch);
    this.options = [];
    // @ts-ignore
    this.pieService.getWords(this.currentSearch)?.subscribe(data => {
      for (const entry of data) {
          this.options.push(entry.word);
      }
    });
  }
}
