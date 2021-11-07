import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../constants/index.constant';
import { Article } from '../shares/interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  postArticle(article: Article) {
    return this.http.post(`${baseUrl}/api/articles`, article)
  }
}
