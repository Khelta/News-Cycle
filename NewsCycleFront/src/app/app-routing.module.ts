import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {GraphComponent} from './components/graph/graph.component';
import {PieComponent} from './components/pie/pie.component';
import {UpdateComponent} from './components/update/update.component';

const routes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'graph', component: GraphComponent},
  {path: 'pie', component: PieComponent},
  {path: 'update', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
