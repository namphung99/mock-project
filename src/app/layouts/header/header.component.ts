import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn: boolean = false;
  token: any;
  public imgUrl!: any;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.authService.emitIsLogin.subscribe(response => {
      this.isLoggedIn = response;
    })
    this.getUserImage(this.getUsernameFromLocalStorage()).subscribe(m =>{
      this.imgUrl = m;
      this.imgUrl = this.imgUrl.profile.image;
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.authService.setLoggedIn(false);
    this.router.navigate(['/login'])
  }

  getUsernameFromLocalStorage() {
    let username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
    if(!username){
      return 'hello';
    }
    return username;
  }

  getUserImage(username: string) {
    return this.userService.getProfilesUser(username);
  }
}
