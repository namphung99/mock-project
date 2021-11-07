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
    body: "This is body",
    tags: ['tag1', 'tag2']
  };

  constructor() { }

  ngOnInit() {
  }

}
