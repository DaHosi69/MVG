import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login-page/login/login.component";
import {OverviewComponent} from "./components/overview-page/overview/overview.component";
import { ReservationsComponent } from './components/reservation-page/reservations/reservations.component';
import { reservationsResolver } from './components/reservation-page/resolvers/reservations.resolver';
import { AuthGuard } from '../services/auth.guard';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'overview', component: OverviewComponent, canActivate: [AuthGuard]},
  {path: 'reservations/:id', component: ReservationsComponent, resolve: { seats: reservationsResolver }, canActivate: [AuthGuard] },
  {path: '**', redirectTo: 'login'}
];
