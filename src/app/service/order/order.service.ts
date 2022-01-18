import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.URL_API;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private httpClient: HttpClient) { }

  public getOrder(id: any):Observable<any>{
    return this.httpClient.get(`${this.url}/user-book`)
  }

  public findById(id: any): Observable<any>{
    return this.httpClient.get(`${this.url}/orders/${id}`);
  }

  public confirmOrder(id: any): Observable<any>{
    return this.httpClient.put(`${this.url}/orders/received/${id}`, this.httpOptions);
  }

  public completeOrder(id: any): Observable<any>{
    return this.httpClient.put(`${this.url}/orders/complete/${id}`, this.httpOptions);
  }

  public deleteOrder(id: any): Observable<any>{
    return this.httpClient.delete(`${this.url}/orders/${id}`);
  }
}


