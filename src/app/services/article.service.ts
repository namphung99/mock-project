import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants/index.constant';
import { ArticleGet, ArticlePost } from '../shares/interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articles: ArticleGet[] = [];
  public emitArticle: EventEmitter<ArticleGet[]> = new EventEmitter();
  public emitTag: EventEmitter<string[]> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getArticles(): void {
    this.http.get(`${baseUrl}/api/articles/?limit=5`).subscribe((res: any) => {
      this.articles = res.articles
      this.emitArticle.emit(this.articles);
    })
  }

  getArticlesFeed(): void {
    // this.http.get(`${baseUrl}/api/articles/feed`).subscribe((res: any) => {
    //   this.articles = res.articles
    //   this.emitArticle.emit(this.articles);
    // })

    this.http.get(`${baseUrl}/api/articles?author=namphung`).subscribe((res: any) => {
      this.articles = res.articles
      this.emitArticle.emit(this.articles);
    })
  }

  getTags(): void {
    this.http.get(`${baseUrl}/api/tags`).subscribe((res: any) => {
      this.emitTag.emit(res.tags);
    })
  }

  getArticlesByTag(tag:string): void {
    this.http.get(`${baseUrl}/api/articles/?tag=${tag}`).subscribe((res: any) => {
      this.articles = res.articles
      this.emitArticle.emit(this.articles);
    })
  }

  postArticle(article: ArticlePost):Observable<ArticleGet> {
    return this.http.post<ArticleGet>(`${baseUrl}/api/articles`, article)
  }

  setArticle(article: ArticleGet): void {
    this.articles.unshift(article);
    this.emitArticle.emit(this.articles);
  }

  getSingleArticle(slug:string){
    const url = `${baseUrl}/api/articles/${slug}`;
    return this.http.get(url)
  }
}
