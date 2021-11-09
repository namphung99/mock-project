import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';
import { ModalArticleComponent } from '../../share-modules/modal-article/modal-article.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public articles: ArticleGet[] = [];
  public tags:string[]=[];
  public tagSelect:string="";
  public isGlobal: boolean = false;
  public isLoggedIn: boolean = false;
  public imgUrl: string = "https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"
  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    !this.isLoggedIn ? this.articleService.getArticlesFeed() : this.articleService.getArticles();
    this.articleService.emitArticle.subscribe((res: ArticleGet[]) => {
      this.articles = res
    })

    this.articleService.getTags();
    this.articleService.emitTag.subscribe((res: string[]) => {
      this.tags = res
    })
  }
  open() {
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }

  onChangeGlobal() {
    this.isGlobal = !this.isGlobal;
    this.isGlobal ? this.articleService.getArticles() : this.articleService.getArticlesFeed();
  }

  onChangeTag(tag:string){
    this.isGlobal =true
    this.tagSelect=tag;
    this.articleService.getArticlesByTag(tag);
  }

}
