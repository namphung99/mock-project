import { baseUrl } from './../constants/index.constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: any;

  constructor(private readonly http: HttpClient) { }

  getUsernameFromCurrentUser() {
    return this.http.get(`${baseUrl}/api/user`);
  }

  getCurrentUser() {
    this.getUsernameFromCurrentUser().subscribe(m => {
      this.currentUser = m;
      return this.getProfilesUser(this.currentUser.user.username)
    })
  }

  getProfilesUser(username: any) {
    return this.http.get(`${baseUrl}/api/profiles/${username}`);
  }
}
