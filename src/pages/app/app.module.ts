import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgDatepickerModule } from 'ng2-datepicker';

import { PredictionService } from '../../services/prediction.service';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false} // <-- debugging purposes only
    ),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ModalModule.forRoot(),
    NgDatepickerModule
  ],
  providers: [PredictionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
