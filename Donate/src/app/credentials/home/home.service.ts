import { Injectable } from '@angular/core';
import { ApiAccessService } from 'src/app/api-access.service';
import { CredentialsService } from '../credentials.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private router: Router,
    private _apiAccessService: ApiAccessService,
    private _credentialsService: CredentialsService
  ) { }

  public navigateToRegister(register: any) {
    this._credentialsService.setUser(register);
    this.router.navigate(['/credentials/register']);
  }

  public validateConfirmPassword(password, confirmPassword) {
    if(password === confirmPassword) {
      return true;
    }

    return false;
  }

  public doLogin(user: any) {
    this._apiAccessService.post('/user/login', user)
        .then((response: Response) => {
          localStorage.setItem("API_KEY", JSON.stringify(response));
          this.router.navigate(['/']);
        }).catch(this.handleError);
  }

  private handleError(err: any) {
    let alerta: string = "Seguintes erros:\n\n";
    err.error.errors.forEach(error => {
      alerta += " - "+error + "\n";
    });
    
    alert(alerta);
  }
}
