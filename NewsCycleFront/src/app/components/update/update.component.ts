import {Component} from '@angular/core';
import {PieService} from '../pie/pie.service';
import {Medium} from '../pie/interfaces';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent{

  dataSource: Medium[]  = [];
  displayedColumns: string[] = ['medium', 'last_updated', 'update'];
  today = new Date().toISOString().slice(0, 10);

  constructor(private pieSerice: PieService) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void{
    const promise = this.pieSerice.getMedia().then(data => this.dataSource = data);
  }

  update(elementName: any): void{
    this.pieSerice.updateMedia(elementName).then(() => window.location.reload());
  }

}
