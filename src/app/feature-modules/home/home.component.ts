import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalArticleComponent } from '../modal-article/modal-article.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public token!: any;
  isLoggedIn: boolean = false;
  public imgUrl:string="https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
  }
  open() {
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }

}
