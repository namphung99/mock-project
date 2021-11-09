import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../shares/interfaces/comment.interface';
import { baseUrl } from '../constants/index.constant';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  postComment(comment: any, slug: string) {
    const url = `${baseUrl}/api/articles/${slug}/comments`
    return this.http.post<any>(url, comment,httpOptions);
  }

  getComments(slug: string){
    const url = `${baseUrl}/api/articles/${slug}/comments`
    return this.http.get(url);
  }

  deleteComment(id: any, slug: string){
    const url = `${baseUrl}/api/articles/${slug}/comments/${id}`;
    return this.http.delete(url)
  }
}
