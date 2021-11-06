import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public token!: any;
  public imgUrl:string="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor() { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    console.log(this.token)
  }

}
