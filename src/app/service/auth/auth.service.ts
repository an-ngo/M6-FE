import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.URL_API;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public login(loginForm: any): Observable<any>{
    return  this.http.post(`${this.url}/signin`, loginForm);
  }
  public logOut(): Observable<any>{
    return this.http.get(`${this.url}/logout/logout`, this.httpOptions);
  }
}
