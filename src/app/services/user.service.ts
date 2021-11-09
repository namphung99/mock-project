import { baseUrl } from './../constants/index.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUsernameFromCurrentUser() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => {
      console.log(res.user.username);
      return res.user.username;
    }));
  }

  getUser() {
    return this.http.get(`${baseUrl}/api/user`);
  }

  getProfilesUser(username: any) {
    return this.http.get(`${baseUrl}/api/profiles/${username}`);
  }

  getEmail() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => res.user.email));
  }

  editUser(data: {}) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put(`${baseUrl}/api/user`, data, httpOptions).subscribe(data => console.log(data)),(err: any) => console.log(err)
  }
}
