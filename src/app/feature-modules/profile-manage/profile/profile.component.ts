import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public imgBackgroundUrl: string =
    'https://vnn-imgs-f.vgcloud.vn/2020/06/10/09/-3.jpg';
  public imgAvatarUrl: string =
    'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg';
  public username: string = 'Suger baby';

  public currentUser: any;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userService.getCurrentUser());
  }
}
