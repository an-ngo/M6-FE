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
  constructor(private http: HttpClient) { }

  public getOrder(id: any):Observable<any>{
    return this.http.get(`${this.url}/user-book`)
  }

  public findById(id: any): Observable<any>{
    return this.http.get(`${this.url}/orders/${id}`);
  }

  public confirmOrder(id: any): Observable<any>{
    return this.http.put(`${this.url}/orders/received/${id}`, this.httpOptions);
  }

  public completeOrder(id: any): Observable<any>{
    return this.http.put(`${this.url}/orders/complete/${id}`, this.httpOptions);
  }

  public deleteOrder(id: any): Observable<any>{
    return this.http.delete(`${this.url}/orders/${id}`);
  }

  public findAll(page: any) : Observable<any>{
    return  this.http.get(`${this.url}/orders/all?page=${page}`);

  }
  public createOrder(formOrder: any): Observable<any>{
    return this.http.post(`${this.url}/orders`, formOrder, this.httpOptions);
  }

  public sendCommentOrFeedback(id: any, orderForm: any){
    return this.http.put(`${this.url}/orders/${id}`,orderForm);
  }


}


