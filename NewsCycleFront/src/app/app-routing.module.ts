import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {GraphComponent} from './components/graph/graph.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {path: '', component: FrontpageComponent},
  {path: 'graph', component: GraphComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
