import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { CountriesComponent } from './components/countries/countries.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
