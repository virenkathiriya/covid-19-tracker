import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';
import { ReportDetailComponent } from './components/report/report-detail/report-detail.component';
import { ReportNewComponent } from './components/report/report-new/report-new.component';
import { ReportResolverService } from './components/report/report-resolver.service';
import { ReportComponent } from './components/report/report.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {
    path: 'reports', component: ReportComponent, canActivate: [AuthGuard], children: [
      { path: 'new', component: ReportNewComponent },
      { path: ':id', component: ReportDetailComponent, resolve: [ReportResolverService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
