import { Injectable } from '@angular/core';
import { ApiAccessService } from 'src/app/api-access.service';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(
    private _apiAccess: ApiAccessService
  ) { }

  public getFeed(callback) {
    this._apiAccess.get("/stories")
        .then((response: any) => {
          callback(response);
        })
        .catch(this.handleError);
  }

  private handleError(err: any) {
    let alerta: string = "Seguintes erros: \n\n";
    err.error.messages.forEach(error => {
      alerta += " - "+error + "\n";
    });

    alert(alerta);
  }

}
