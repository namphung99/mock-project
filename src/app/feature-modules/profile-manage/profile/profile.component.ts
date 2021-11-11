import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public imgBackgroundUrl: string =
    'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg';
  public currentUser: any;
  private user$: any;
  public usernameFromLocalStorage: string = JSON.parse(localStorage.getItem('currentUser') || '{}').username;

  constructor(
    private route: ActivatedRoute,
    private service: UserService
    ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.service.getProfilesUser(params.get('username')!))
    ).subscribe(m => {
      this.currentUser = m
    })
  }

  checkIsFollow(isFollow: boolean, username: string) {
    // this.service.editFollow(isFollow, username).subscribe(m => console.log(m));
    if(isFollow) {
      return this.currentUser.profile.following = false;
    }
    return this.currentUser.profile.following = true;
  }
}
