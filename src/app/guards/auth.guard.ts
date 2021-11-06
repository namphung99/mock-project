import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
      private authService: AuthService,
      private router: Router,
    ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  :Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLoggedIn = this.authService.getIsLoggedIn();
    if(isLoggedIn){
      return this.router.createUrlTree(['/'])
    }
    else{
      return true;
    }
  }
}
