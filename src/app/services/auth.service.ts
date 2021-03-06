import { UserLogin, UserRegistration } from '../shares/interfaces/user.interface';
import { baseUrl } from '../constants/index.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
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
    const url = `${baseUrl}/api/users/login`;
    return this.http.post(url, user,httpOptions)
  }

  registration(user: UserRegistration ){
    const url = `${baseUrl}/api/users`;
    return this.http.post<any>(url, user, httpOptions);
  }

  logUserIn(user : any){
    this.isLoggedIn = true;
    this.emitIsLogin.emit(this.isLoggedIn)
    this.token = user.user.token;
    localStorage.setItem("token", user.user.token);
    localStorage.setItem("currentUser",JSON.stringify({
      email: user.user.email,
      username: user.user.username,
    }));
    localStorage.setItem("avatar", (user.user.image==undefined ? 'https://static.productionready.io/images/smiley-cyrus.jpg' : user.user.image))
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  setLoggedIn(value:boolean){
    this.isLoggedIn = value;
    this.emitIsLogin.emit(this.isLoggedIn)
  }
}
