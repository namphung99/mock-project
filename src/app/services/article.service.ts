import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../constants/index.constant';
import { ArticleGet, ArticlePost } from '../shares/interfaces/article.interface';
import { limitArticle } from "../constants/index.constant"
import { ArticleDetail } from '../shares/interfaces/article-detail.interface';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
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
  public emitArticleDetail: EventEmitter<ArticleDetail> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getArticles(offset: number): void {
    this.http.get(`${baseUrl}/api/articles/?limit=${limitArticle}&offset=${offset}`)
      .subscribe((res: any) => this.setDataEmit(res))
  }

  getArticlesFeed(offset: number): void {
    this.http.get(`${baseUrl}/api/articles/feed?limit=${limitArticle}&offset=${offset}`)
      .subscribe((res: any) => this.setDataEmit(res))
  }

  getArticlesByUsername(offset: number, username: string): void {
    this.http.get(`${baseUrl}/api/articles/?author=${username}&limit=${limitArticle}&offset=${offset}`)
      .subscribe((res: any) => this.setDataEmit(res))
  }

  getArticlesByFavorite(favorite: string, offset: number): void {
    this.http.get(`${baseUrl}/api/articles/?favorited=${favorite}&limit=${limitArticle}&offset=${offset}`)
      .subscribe((res: any) => this.setDataEmit(res))
  }

  getTags(): void {
    this.http.get(`${baseUrl}/api/tags`).subscribe((res: any) => {
      this.emitTag.emit(res.tags);
    })
  }

  getArticlesByTag(tag: string, offset: number): void {
    this.http.get(`${baseUrl}/api/articles/?tag=${tag}&limit=${limitArticle}&offset=${offset}`)
      .subscribe((res: any) => this.setDataEmit(res))
  }

  postArticle(article: ArticlePost): Observable<ArticleGet> {
    return this.http.post<ArticleGet>(`${baseUrl}/api/articles`, article, httpOptions)
  }

  postArticleFavorite(slug: string): void {
    this.http.post<ArticleGet>(`${baseUrl}/api/articles/${slug}/favorite`, '').subscribe((res: any) => {
      this.emitArticleDetail.emit(res.article)
      let data = this.articles.map((item) => {
        if (item.slug == res.article.slug) return res.article;
        return item;
      })
      this.emitArticle.emit(data);
    })
  }

  deleteArticleFavorite(slug: string): void {
    this.http.delete<ArticleGet>(`${baseUrl}/api/articles/${slug}/favorite`).subscribe((res: any) => {
      this.emitArticleDetail.emit(res.article)
      let data = this.articles.map((item) => {
        if (item.slug == res.article.slug) return res.article;
        return item;
      })
      this.emitArticle.emit(data);
    })
  }

  handelArticleFavorite(slug: string, isFavorite: boolean): void {
    if (isFavorite) {
      this.postArticleFavorite(slug)
    }
    else {
      this.deleteArticleFavorite(slug);
    }
  }

  getSingleArticle(slug: string) {
    const url = `${baseUrl}/api/articles/${slug}`;
    return this.http.get(url)
      .pipe(
        map((res: any) => res.article)
      )
      .subscribe(response => {
        this.emitArticleDetail.emit(response)
      })
  }

  deleteArticle(slug: string) {
    const url = `${baseUrl}/api/articles/${slug}`;
    return this.http.delete(url);
  }

  editArticle(slug: string, article: ArticlePost) {
    const url = `${baseUrl}/api/articles/${slug}`;
    return this.http.put(url, article, httpOptions)
  }

  setArticleSlug(slug: string) {
    this.articleSlug = slug;
  }

  getArticleSlug() {
    return this.articleSlug;
  }

  setArticle(article: ArticleGet): void {
    this.articles.unshift(article);
    this.emitArticle.emit(this.articles);
  }

  setDataEmit(data: any): void {
    this.articles = data.articles
    this.emitArticle.emit(data.articles);
    this.emitArticlesCount.emit(data.articlesCount)
  }
}
