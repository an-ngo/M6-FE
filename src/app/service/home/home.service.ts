import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = environment.URL_API;
  constructor(private http: HttpClient) { }

  public findAllProviders(page: any): Observable<any>{
    return this.http.get(`${this.url}/users/list?page=${page}`);
  }
  public getTop6ProviderHot(): Observable<any>{
    return this.http.get(`${this.url}/users/top-6-provider-hot`);
  }
  public getTop12CountTime(): Observable<any>{
    return this.http.get(`${this.url}/users/find-top12-counttime`);
  }
  public getTop12JoinDate(): Observable<any>{
    return this.http.get(`${this.url}/users/find-top12-joindate`);
  }
  public getTop6ViewPage(): Observable<any>{
    return this.http.get(`${this.url}/users/find-top6-viewpage`);
  }
  public search(formSearch: any, page: any): Observable<any>{
    return this.http.post(`${this.url}/users/search?page=${page}`, formSearch);
  }
  public findProvider(id: any): Observable<any>{
    return this.http.get(`${this.url}/users/${id}`);
  }
}
