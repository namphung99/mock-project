import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  @Input()
  articles: ArticleGet[] = []
  @Output() changeTag = new EventEmitter();
  public username: string = ""

  constructor(
    private router: Router,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') ?
      JSON.parse(localStorage.getItem('currentUser') || '').username : "";
  }

  onChangeTag(tag: string[]) {
    this.changeTag.emit(tag);
  }

  viewDetailArticle(slug: any) {
    this.router.navigate(['article', slug])
  }

  handleLike(slug: string, favorited: boolean) {
    console.log(this.username);

    if (this.username) {
      this.articleService.handelArticleFavorite(slug, !favorited)
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  redirectProfilePage(username: string) {
    this.router.navigate(['profile', username]);
  }
}
