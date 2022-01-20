import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.URL_API;
  // eventSource = new EventSource(`${this.url}/messages/subscribe`);
  constructor(private http: HttpClient) {
  }
  public getMessageByRoom(roomChat: any): Observable<any>{
    return this.http.post(`${this.url}/messages/room`, roomChat);
  }
  // public getEventSource(): EventSource {
  //   return this.eventSource;
  // }
  public  saveMessage(messageForm: any, roomId: any): Observable<any> {
    return this.http.post(`${this.url}/messages?roomId=${roomId}`, messageForm);
  }
  public  createMessage(messageForm: any): Observable<any> {
    return this.http.post(`${this.url}/messages/create`, messageForm);
  }
}
