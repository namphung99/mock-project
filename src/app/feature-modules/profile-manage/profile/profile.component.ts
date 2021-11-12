import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import { UserProfile } from 'src/app/shares/interfaces/user.interface';
import { limitArticle } from "../../../constants/index.constant"
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public imgBackgroundUrl: string =
    'https://www.solidbackgrounds.com/images/1920x1080/1920x1080-gray-solid-color-background.jpg';
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

  constructor(
    private route: ActivatedRoute,
    private service: UserService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') ?
      JSON.parse(localStorage.getItem('currentUser') || '').username : "";

    this.route.paramMap.subscribe(paramMap => {
      this.service.getProfilesUser(paramMap.get('username')).subscribe((res: any) => {
        this.articleService.getArticlesByUsername(0, res.profile.username);
        this.currentUser = res.profile
      })
    })

    this.articleService.emitArticle.subscribe((res: ArticleGet[]) => this.articles = res)
    this.articleService.emitArticlesCount.subscribe((res: number) => this.articlesCount = res)

  }

  checkIsFollow(isFollow: boolean, username: string) {
    // this.service.editFollow(isFollow, username).subscribe(m => console.log(m));
    if (isFollow) {
      return this.currentUser.following = false;
    }
    return this.currentUser.following = true;
  }

  onChangeTag(tag: string) {
    console.log("abc");
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
}
