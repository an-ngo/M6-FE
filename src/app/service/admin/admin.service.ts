import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  URL_API = environment.URL_API;



  constructor(
    private http: HttpClient
  ) { }

  public findAll(page: any) : Observable<any>{
    return  this.http.get(`${this.URL_API}/admin?page=${page}`);

  }

}
