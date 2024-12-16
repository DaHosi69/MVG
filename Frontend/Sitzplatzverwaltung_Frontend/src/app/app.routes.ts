import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OverviewComponent} from "./overview/overview.component";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent},
  {path: '**', redirectTo: 'login'}
];
