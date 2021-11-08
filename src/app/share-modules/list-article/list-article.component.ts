import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  listItems = [
    {
      avatar: 'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg',
      username: 'trieu',
      publishedDate: '10/10/2012',
      like: 18,
      title: "This is title of page",
      description: "This is description",
      tags: ['tag1', 'tag2']
    },
    {
      avatar: 'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg',
      username: 'trieu',
      publishedDate: '10/10/2012',
      like: 20,
      title: "This is title of page",
      description: "This is description",
      tags: ['tag1', 'tag2', 'tag1', 'tag2']
    }
  ];

  constructor() {}

  ngOnInit(): void {
  }

  toggleLike() {
    console.log("Hello");
  }
}
