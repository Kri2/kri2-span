import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  API_URL = environment.apiUrl;//localhost:8080/api or kri2-herokuapp.com/api
  constructor(private httpClient:HttpClient) {}
  getCars(){return this.httpClient.get(`${this.API_URL}/cars`);}
}
