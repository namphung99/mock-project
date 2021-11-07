import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  article = {
    avatar: 'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg',
    username: 'trieu',
    publishedDate: '10/10/2012',
    like: 18,
    title: "This is title of page",
    description: "This is description",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    tags: ['tag1', 'tag2'],
    comments: ['']
  };

  constructor() { }

  ngOnInit() {
  }

  addComment(comment: string) {
    if(this.article.comments[0] === ''){
      this.article.comments[0] = comment;
      return;
    }
    this.article.comments.push(comment);
  }
}
