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
  public tags: string[] = [];
  public tagSelect: string = "";
  public tabActive: number = 1;
  public isLoggedIn: boolean = false;
  
  public articlesCount: number = 0;
  public totalItem: number = 0;
  public imgUrl: string = "https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg"

  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getIsLoggedIn();
    if (this.isLoggedIn) {
      this.articleService.getArticlesFeed()
    }
    else {
      this.articleService.getArticles(0);
      this.tabActive = 2;
    }

    this.articleService.emitArticle.subscribe((res: ArticleGet[]) => {
      this.articles = res
    })

    this.articleService.emitArticlesCount.subscribe((res: number) => {
      this.articlesCount = res
      console.log('res',res);
      
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

  onChangeGlobal(tab: number) {
    this.tabActive = tab;
    this.tagSelect = ""
    this.tabActive == 2 ? this.articleService.getArticles(0) : this.articleService.getArticlesFeed();
  }

  onChangeTag(tag: string) {
    this.tabActive = 3;
    this.tagSelect = tag;
    this.articleService.getArticlesByTag(tag);
  }

  // Phân trang

  pagination(offset: number) {
    this.articleService.getArticles(offset)
  }

  onPagination(offset: number) {
    this.totalItem = offset;
    this.pagination(this.totalItem)
  }

  previousPagination() {
    if (this.totalItem > 0) {
      this.totalItem = this.totalItem - 5;
      this.pagination(this.totalItem)
    }
    else this.totalItem = 0
  }

  nextPagination() {
    if (this.totalItem + 5 < this.articlesCount) {
      this.totalItem = this.totalItem + 5;
      this.pagination(this.totalItem)
    }
    else this.totalItem = this.articlesCount
  }

}
