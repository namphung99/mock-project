import { baseUrl } from './../constants/index.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly http: HttpClient) { }

  getUsernameFromCurrentUser() {
    return this.http.get(`${baseUrl}/api/user`).pipe(map((res:any) => res.user.username));
  }

  getProfilesUser(username: any) {
    return this.http.get(`${baseUrl}/api/profiles/${username}`);
  }
}
