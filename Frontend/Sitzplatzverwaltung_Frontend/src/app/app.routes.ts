import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {OverviewComponent} from "./components/overview/overview.component";
import { ReservationsComponent } from './components/reservations/reservations.component';
import { reservationsResolver } from './resolvers/reservations.resolver';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent},
  {path: 'reservations/:id', component: ReservationsComponent, resolve: { seats: reservationsResolver } },
  {path: '**', redirectTo: 'login'}
];
