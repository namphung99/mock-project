import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../constants/Urls';
import { USER_LOGIN } from '../shares/interfaces/user-login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  token: string = "";
  user!: any;
  constructor(private http: HttpClient) {
    let token = localStorage.getItem('token');
    // nếu có token ==> đánh dấu đã login
    if(token) {
      this.isLoggedIn = true;
      this.token = token;
    }
  }

  login(user : USER_LOGIN){
    const url = URLS.baseUrl;
    return this.http.post(`${url}/api/users/login`, user)
  }

  logUserIn(user : any){
    console.log(user);
    this.isLoggedIn = true;
    this.user = user;
    this.token = user.user.token;
    localStorage.setItem("token", user.user.token);

  }

  getIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }
}
