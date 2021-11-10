import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewDetailArticle(slug: any){
    this.router.navigate(['article', slug])
  }

  toggleLike() {
    console.log("Hello");
  }
}
