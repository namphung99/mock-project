import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { baseUrl } from '../constants/index.constant';
import { ArticleGet, ArticlePost } from '../shares/interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articles:ArticlePost[]=[];
  public emitArticle:EventEmitter<any>=new EventEmitter();
  constructor(private http: HttpClient) { }

  getArticles() {
    this.http.get(`${baseUrl}/api/articles`).subscribe((res: any) => {
      this.articles=res.articles
      this.emitArticle.emit(this.articles);
    })
  }

  postArticle(article: ArticlePost) {
    return this.http.post(`${baseUrl}/api/articles`, article)
  }

  setArticle(article:ArticlePost){
    this.articles.unshift(article);
    this.emitArticle.emit(this.articles);
  }
}
