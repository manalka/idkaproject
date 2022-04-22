import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private requests: HttpClient) { }

  urlApi = 'http://localhost:8080/register';

  register(registerForm:any) {
    return this.requests.post(this.urlApi,registerForm);
  }
}
