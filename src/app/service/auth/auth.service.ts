import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.URL_API;
  constructor(private http: HttpClient) { }

  public login(loginForm: any): Observable<any>{
    return  this.http.post(`${this.url}/signin`, loginForm);
  }
}
