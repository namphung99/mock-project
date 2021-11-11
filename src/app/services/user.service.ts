import { baseUrl } from './../constants/index.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUsernameFromCurrentUser() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => {
      return res.user.username;
    }));
  }

  getProfilesUser(username: any) {
    return this.http.get(`${baseUrl}/api/profiles/${username}`);
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

  editFollow(isFollow: boolean, username: string){
    if(isFollow) {
      return this.http.post(`${baseUrl}/api/profiles/${username}/follow`, '');
    }
    return this.http.delete(`${baseUrl}/api/profiles/${username}/follow`);
  }
}
