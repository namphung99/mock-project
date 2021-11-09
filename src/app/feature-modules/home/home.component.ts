import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleGet, ArticlePost } from 'src/app/shares/interfaces/article.interface';
import { ModalArticleComponent } from '../../share-modules/modal-article/modal-article.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public token!: any;
  public articles: ArticleGet[] = []
  isLoggedIn: boolean = false;
  public imgUrl: string = "https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.articleService.getArticles();
    this.articleService.emitArticle.subscribe((res:ArticleGet[]) => {
      this.articles = res
    })
  }
  open() {
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }

}
