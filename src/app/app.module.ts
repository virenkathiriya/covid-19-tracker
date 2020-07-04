import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { HelpLineComponent } from './components/helpline/helpline.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { AuthComponent } from './components/auth/auth.component';
import { ReportComponent } from './components/report/report.component';
import { ReportListComponent } from './components/report/report-list/report-list.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportItemComponent } from './components/report/report-list/report-item/report-item.component';
import { ReportDetailComponent } from './components/report/report-detail/report-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CountriesComponent,
    DashboardCardComponent,
    AuthComponent,
    HelpLineComponent,
    ReportComponent,
    ReportListComponent,
    ReportNewComponent,
    ReportItemComponent,
    ReportDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
