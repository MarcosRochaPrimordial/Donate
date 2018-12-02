import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAccessService } from 'src/app/api-access.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private router: Router,
    private _apiAccessService: ApiAccessService
  ) { }

  public doRegister(register: any) {
    this._apiAccessService.post('/user', register)
        .then((response: any) => {
          alert(`Parabéns, ${response.completeName}, seu cadastro foi concluído!`);
          this.router.navigate(['/credentials']);
        }).catch(this.handleError);
  }

  private handleError(err: any) {
    let alerta: string = "Seguintes erros: \n\n";
    err.error.errors.forEach(error => {
      alerta += " - "+error + "\n";
    });

    alert(alerta);
  }
}
