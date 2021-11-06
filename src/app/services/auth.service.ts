import { UserLogin } from '../shares/interfaces/user.interface';
import { baseUrl } from '../constants/index.constant';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  token: string = "";
  user!: any;
  emitIsLogin!: EventEmitter<boolean>;

  constructor(private http: HttpClient) {
    this.emitIsLogin = new EventEmitter();
    let token = localStorage.getItem('token');
    // nếu có token ==> đánh dấu đã login
    if(token) {
      this.isLoggedIn = true;
      this.token = token;
      this.emitIsLogin.emit(this.isLoggedIn)
    }
    else{
      this.isLoggedIn = false;
    }
  }

  login(user : UserLogin){
    const url = baseUrl;
    return this.http.post(`${url}/api/users/login`, user)
  }

  logUserIn(user : any){
    this.isLoggedIn = true;
    this.emitIsLogin.emit(this.isLoggedIn)
    this.user = user.user;
    this.token = user.user.token;
    localStorage.setItem("token", user.user.token);
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  setLoggedIn(value:boolean){
    this.isLoggedIn = value;
    this.emitIsLogin.emit(this.isLoggedIn)
  }
}
