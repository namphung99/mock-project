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
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.authService.emitIsLogin.subscribe(response => {
      this.isLoggedIn = response;
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

  getAvatarFromLocalStorage() {
    let avatar = JSON.parse(localStorage.getItem('currentUser') || '{}').image;
    if(!avatar) {
      return '';
    }
    return avatar;
  }

  public isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
