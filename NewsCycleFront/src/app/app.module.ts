import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import {FrontpageComponent} from './components/frontpage/frontpage.component';
import {GraphComponent} from './components/graph/graph.component';
import {PieComponent} from './components/pie/pie.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontpageComponent,
    GraphComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NgxChartsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
