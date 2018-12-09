import { Injectable } from '@angular/core';
import { ApiAccessService } from 'src/app/api-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private _apiAccessService: ApiAccessService
  ) { }

  saveStory(story: string) {
    this._apiAccessService.put('/stories', { presentationText: story })
        .then((response: any) => {
          alert('Texto de apresentação cadastrado com sucesso!');
        })
        .catch(this.handleError);
  }

  getOwnStory(): Promise<string> {
    return this._apiAccessService.get('/stories/own')
        .then((response: any) => {
          return response;
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
