import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL_API = environment.URL_API;

  constructor(
    private http: HttpClient
  ) { }

  public findAll(page: any) : Observable<any>{
    return  this.http.get(`${this.URL_API}/orders/all?page=${page}`);

  }

}
