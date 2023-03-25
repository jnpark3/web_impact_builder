import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  token = '';

  rootURL = '/api';

  verify(){
    const token = sessionStorage.getItem("token");
    return this.http.post('http://localhost:3080/api/verify', {token: token});
  }

  loginUser(username: string, password: string){
    return this.http.post('http://localhost:3080/api/login', {username: username, password: password});
  }

  registerUser(firstname: string, lastname: string, email: string, username: string, password: string){
    return this.http.post('http://localhost:3080/api/register', {firstname: firstname, lastname: lastname, email: email, username: username, password: password});
  }

  getInfo(){
    const token = sessionStorage.getItem("token");
    return this.http.post('http://localhost:3080/api/getinfo', {token: token});
  }

  createWeb(name: string){
    const token = sessionStorage.getItem("token");
    return this.http.post('http://localhost:3080/api/createweb', {token: token, name: name});
  }

  getWebsite(id: number){
    const token = sessionStorage.getItem("token");
    return this.http.post('http://localhost:3080/api/getwebsite', {token: token, id: id});
  }

  addToken(t: string){
    window.sessionStorage.setItem("token", t);
  }

  removeToken(){
    window.sessionStorage.setItem("token", "");
  }
}
