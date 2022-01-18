import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private url = environment.URL_API;
  constructor(private http: HttpClient) { }

  public findAllHobby(): Observable<any>{
    return this.http.get(`${this.url}/hobby`);
  }
}
