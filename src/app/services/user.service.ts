import { baseUrl } from './../constants/index.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable,EventEmitter } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { UserProfile } from '../shares/interfaces/user.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public emitUser: EventEmitter<any> = new EventEmitter();
  public user: any = "";

  constructor(private readonly http: HttpClient) { }

  getUsernameFromCurrentUser() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => {
      return res.user.username;
    }));
  }

  getProfilesUser(username: string|null):void {
    this.http.get(`${baseUrl}/api/profiles/${username}`).subscribe((res:any)=>{
      this.emitUser.emit(res);
    });
  }

  getEmail() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => res.user.email));
  }

  editUser(data: {}) {
    return this.http.put(`${baseUrl}/api/user`, data, httpOptions)
    .subscribe(val => {
      return val;
    });
  }

  getUsernameFromLocalStorage() {
    let username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
    if(!username){
      return 'hello';
    }
    return username;
  }

}
