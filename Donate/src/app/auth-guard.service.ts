import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CredentialsService } from './credentials/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let credentialsService: CredentialsService = CredentialsService.getInstance();
    if(credentialsService.getUser()) {
      return true;
    }
    this.router.navigate(['/credentials'])
    return false;
  }
}