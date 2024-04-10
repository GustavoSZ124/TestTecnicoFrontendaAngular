import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  // private baseUrl = "../assets";
  private baseUrl = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<any[]>(`${this.baseUrl}/states`);
  }

  sendForm(datos) {
    console.log("Send Form");

    return this.http.post(`${this.baseUrl}/form`, datos);
  }
}
