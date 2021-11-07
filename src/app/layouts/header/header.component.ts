import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogin:boolean=false;
  public imgUrl:string="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor(
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.isLogin= this.authService.getIsLoggedIn();
    console.log(this.isLogin);
    
  }

}
