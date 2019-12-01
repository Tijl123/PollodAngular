import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { VriendenlijstComponent } from './vriendenlijst/vriendenlijst.component';
import { PollMakenComponent } from './poll-maken/poll-maken.component';
import { VriendenToevoegenComponent } from './vrienden-toevoegen/vrienden-toevoegen.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import { StemmenComponent } from './stemmen/stemmen.component';
import { ResultaatComponent } from './resultaat/resultaat.component';
import { AuthGuard } from '../security/guards/auth.guard';
import { UitnodigenComponent } from './uitnodigen/uitnodigen.component';

const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard2', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'vrienden', component: VriendenlijstComponent, canActivate: [AuthGuard] },
  { path: 'pollmaken', component: PollMakenComponent, canActivate: [AuthGuard] },
  { path: 'stemmen', component: StemmenComponent, canActivate: [AuthGuard] },
  { path: 'addvriend', component: VriendenToevoegenComponent, canActivate: [AuthGuard] },
  { path: 'resultaat', component: ResultaatComponent, canActivate: [AuthGuard]},
  { path: 'uitnodigen', component: UitnodigenComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [DashboardComponent, VriendenlijstComponent, PollMakenComponent, VriendenToevoegenComponent, StemmenComponent, ResultaatComponent, UitnodigenComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    AppRoutingModule,
  ]
})
export class GebruikersModule { }
