import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.URL_API;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public registerProvider(providerForm: any): Observable<any>{
    return this.http.put(`${this.url}/user-provider`, providerForm, this.httpOptions);
  }
  public register(registerForm: any): Observable<any>{
    return this.http.post(`${this.url}/signup`, registerForm);
  }
  public findUserById(id: any): Observable<any>{
    return this.http.get(`${this.url}/users/${id}`);
  }
  public findUserByToken(): Observable<any>{
    return this.http.get(`${this.url}/users/info`, this.httpOptions);
  }

}
