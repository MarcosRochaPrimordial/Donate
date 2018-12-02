import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private static _instance: CredentialsService = null;
  private user: any = null;

  constructor() {
    CredentialsService._instance = this;
  }

  public static getInstance() {
    if(CredentialsService._instance === null) {
      CredentialsService._instance = new CredentialsService();
    }
    return CredentialsService._instance;
  }

  public getUser(): any {
    return this.user;
  }

  public setUser(user: Object) {
      this.user = user;
  }
}
