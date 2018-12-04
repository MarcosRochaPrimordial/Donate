import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
    canActivateChild: [AuthGuardService]
  },
  {
    path: 'credentials',
    loadChildren: './credentials/credentials.module#CredentialsModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
