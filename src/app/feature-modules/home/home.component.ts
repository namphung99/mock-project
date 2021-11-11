import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';
import { ModalArticleComponent } from '../../share-modules/modal-article/modal-article.component';
import { limitArticle } from "../../constants/index.constant"
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

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
  public username: string =""
  public articlesCount: number = 0;
  public totalItem: number = 0;

  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router,
    private uiService: UIService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params: any) => this.tagSelect = params.params.tag);
    this.username=localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser') || '').username:"";
    this.isLoggedIn = this.authService.getIsLoggedIn();
    this.articleService.getTags();
    this.handelArticle()

    this.articleService.emitArticle.subscribe((res: ArticleGet[]) => this.articles = res)
    this.articleService.emitArticlesCount.subscribe((res: number) => this.articlesCount = res)
    this.articleService.emitTag.subscribe((res: string[]) => this.tags = res)
  }

  handelArticle() {
    if (this.isActive("/home/your-article") && this.isLoggedIn) {
      this.articleService.getArticlesFeed(0)
      this.tabActive = 2;
    }
    else if (this.tagSelect) {
      this.articleService.getArticlesByTag(this.tagSelect, 0);
      this.tabActive = 3;
    }
    else {
      this.router.navigate(['/home']);
      this.articleService.getArticles(0);
      this.tabActive = 1;
    }
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  open() {
    this.uiService.setIsSlug(false);
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }

  onChangeGlobal(tab: number) {
    this.tabActive = tab;
    this.tagSelect = ""
    this.totalItem = 0;
    this.tabActive == 1 ? this.articleService.getArticles(0) : this.articleService.getArticlesFeed(0);
  }

  onChangeTag(tag: string) {
    this.router.navigate(['/home'], { queryParams: { tag: tag } });
    this.tabActive = 3;
    this.tagSelect = tag;
    this.totalItem = 0;
    this.articleService.getArticlesByTag(tag, 0);
  }

  // Phân trang

  pagination(offset: number) {
    switch (this.tabActive) {
      case 1:
        this.articleService.getArticles(offset)
        break;
      case 2:
        this.articleService.getArticlesFeed(offset)
        break;
      case 3:
        this.articleService.getArticlesByTag(this.tagSelect, offset)
        break;
    }
  }

  onPagination(offset: number) {
    this.totalItem = offset;
    this.pagination(this.totalItem)
  }

  previousPagination() {
    if (this.totalItem > 0) {
      this.totalItem = this.totalItem - limitArticle;
      this.pagination(this.totalItem)
    }
    else this.totalItem = 0
  }

  nextPagination() {
    if (this.totalItem + limitArticle < this.articlesCount) {
      this.totalItem = this.totalItem + limitArticle;
      this.pagination(this.totalItem)
    }
  }

  getAvatarFromLocalStorage() {
    let avatar = localStorage.getItem('avatar');
    if (!avatar) {
      return '';
    }
    return avatar;
  }
}
