import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private user: any = null;

  public getUser(): any {
    return this.user;
  }

  public setUser(user: Object) {
      this.user = user;
  }
}
