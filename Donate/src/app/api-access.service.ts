import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {

  urlApi: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  public get(path: string = ""): Promise<Response> {
    let key = this.resolveApiKey();
    return this.http.get(`${this.urlApi + path}`, {headers: {
      "Authorization": key
    }})
    .toPromise()
    .then((response: any) => {
      return response;
    });
  }

  public post(path: string = "", obj: any): Promise<Response> {
    let key = this.resolveApiKey();
    return this.http.post(`${this.urlApi + path}`, obj, {headers: {
      "Authorization": key
    }})
    .toPromise()
    .then((response: any) => {
      return response;
    });
  }

  private resolveApiKey() {
    let key = "";
    let apiKey = JSON.parse(localStorage.getItem("API_KEY"));
    if(apiKey) {
      key = apiKey.token;
    }

    return key;
  }
}
