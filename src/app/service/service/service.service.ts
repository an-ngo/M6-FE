import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private url = environment.URL_API;
  constructor(private http: HttpClient) { }
}
