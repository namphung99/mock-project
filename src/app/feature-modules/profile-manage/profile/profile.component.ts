import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';
import { UserProfile } from 'src/app/shares/interfaces/user.interface';
import { limitArticle } from "../../../constants/index.constant";
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public imgBackgroundUrl: string =
    'https://simplepage.vn/blog/wp-content/uploads/2021/06/huong-dan-tao-blog-website.png';
  public currentUser: UserProfile = {
    bio: "",
    following: false,
    image: "",
    username: "",
  };

  public articles: ArticleGet[] = [];
  public tabActive: number = 1;
  public isLoggedIn: boolean = false;
  public username: string = ""
  public articlesCount: number = 0;
  public totalItem: number = 0;
  public currentPage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private articleService: ArticleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') ?
      JSON.parse(localStorage.getItem('currentUser') || '').username : "";

    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.userService.getProfilesUser(paramMap.get('username')).subscribe(
        (res: any) => {
          this.currentUser = res.profile
          this.handelArticle()
        },
        err => {
          this.router.navigate(['error']);
          if (err.status === 404) {
            console.log('Not found');
          }
        }
      )
    })

    this.articleService.emitArticle.subscribe((res: ArticleGet[]) => this.articles = res)
    this.articleService.emitArticlesCount.subscribe((res: number) => this.articlesCount = res)

  }

  handelArticle() {
    if (this.isActive(`/profile/${this.currentUser.username}/favorite-article`)) {
      this.tabActive = 2;
    }
    else this.tabActive = 1;
    this.pagination(0)
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  changFollow() {
    this.userService.editFollow(!this.currentUser.following, this.currentUser.username)
      .subscribe((res: any) => this.currentUser = res.profile);
  }

  onChangeTag(tag: string) {
  }

  onChangeArticle(tab: number) {
    this.tabActive = tab;
    this.totalItem = 0;
    this.pagination(0)
  }

  pagination(offset: number) {
    this.tabActive == 1 ? this.articleService.getArticlesByUsername(offset, this.currentUser.username)
      : this.articleService.getArticlesByFavorite(this.currentUser.username, offset)
  }

  onPagination(offset: number, page: number) {
    this.totalItem = offset;
    this.currentPage = page
    this.pagination(this.totalItem)
  }

  previousPagination() {
    if (this.totalItem > 0) {
      this.totalItem = this.totalItem - limitArticle;
      this.currentPage = --this.currentPage
      this.pagination(this.totalItem)
    }
    else this.totalItem = 0
  }

  nextPagination() {
    if (this.totalItem + limitArticle < this.articlesCount) {
      this.totalItem = this.totalItem + limitArticle;
      this.currentPage = ++this.currentPage;
      this.pagination(this.totalItem)
    }
  }
}
