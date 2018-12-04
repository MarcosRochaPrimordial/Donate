import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { CredentialsService } from './credentials.service';
import { ApiAccessService } from './api-access.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private _credentialsService: CredentialsService,
    private _apiAccess: ApiAccessService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if(this._credentialsService.getUser()) {
      return true;
    }
    this.router.navigate(['/credentials']);
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    let apikey = JSON.parse(localStorage.getItem("API_KEY"));
    if(apikey) {
      return this._apiAccess.post("/user/validateToken", {token: apikey.token})
          .then((response: any) => {
            if(response.isValidated) {
              return true;
            }
          }).catch(this.handleError);
    }
    localStorage.removeItem("API_KEY");
    this.router.navigate(['/credentials']);
    return false;
  }

  private handleError(err: any) {
    let alerta: string = "Seguintes erros:\n\n";
    err.error.messages.forEach(error => {
      alerta += " - "+error + "\n";
    });
    
    alert(alerta);
    return false;
  }
}