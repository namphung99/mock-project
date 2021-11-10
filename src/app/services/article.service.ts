import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants/index.constant';
import { ArticleGet, ArticlePost } from '../shares/interfaces/article.interface';
import {limitArticle} from "../constants/index.constant"

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public articles: ArticleGet[] = [];
  public articlesCount: number = 0;
  public articleSlug!: string;

  public emitArticle: EventEmitter<ArticleGet[]> = new EventEmitter();
  public emitTag: EventEmitter<string[]> = new EventEmitter();
  public emitArticlesCount: EventEmitter<number> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getArticles(offset:number): void {
    this.http.get(`${baseUrl}/api/articles/?limit=${limitArticle}&offset=${offset}`).subscribe((res: any) => {
      this.articles = res.articles
      
      this.emitArticle.emit(this.articles);
      this.emitArticlesCount.emit(res.articlesCount)
    })
  }

  getArticlesFeed(offset:number): void {
    this.http.get(`${baseUrl}/api/articles?author=thuc&offset=${offset}`).subscribe((res: any) => {
      this.articles = res.articles
      this.emitArticle.emit(this.articles);
      this.emitArticlesCount.emit(res.articlesCount)
    })
  }

  getTags(): void {
    this.http.get(`${baseUrl}/api/tags`).subscribe((res: any) => {
      this.emitTag.emit(res.tags);
    })
  }

  getArticlesByTag(tag:string,offset:number): void {
    this.http.get(`${baseUrl}/api/articles/?tag=${tag}&limit=${limitArticle}&offset=${offset}`).subscribe((res: any) => {
      this.articles = res.articles
      this.emitArticle.emit(this.articles);
      this.emitArticlesCount.emit(res.articlesCount)
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

  deleteArticle(slug:string){
    const url = `${baseUrl}/api/articles/${slug}`;
    return this.http.delete(url);
  }

  setArticleSlug(slug: string) {
    this.articleSlug = slug;
  }

  getArticleSlug() {
    return this.articleSlug;
  }
}
