import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = environment.URL_API;

  constructor(private http: HttpClient) { }

  public create(roomChat: any): Observable<any>{
    return this.http.post(`${this.url}/rooms`, roomChat);
  }
  public findById(id: any): Observable<any>{
    return this.http.get(`${this.url}/rooms/${id}`);
  }
  public findAllByUserId(id: any): Observable<any>{
    return this.http.get(`${this.url}/rooms/user/${id}`);
  }
}
