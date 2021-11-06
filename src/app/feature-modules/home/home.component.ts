import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public token!: any;
  isLoggedIn: boolean = false;
  public imgUrl:string="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
  }
}
