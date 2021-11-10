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
  public user!: any;
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

    this.userService.getProfilesUser(this.getUsernameFromLocalStorage());
    this.userService.emitUser.subscribe((res:any) => {
      this.user = res
      // console.log("home",this.user);
    })
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

}
