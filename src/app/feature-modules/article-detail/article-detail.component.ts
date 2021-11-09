import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleDetail } from 'src/app/shares/interfaces/article-detail.interface';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  // article = {
  //   avatar: 'https://luv.vn/wp-content/uploads/2021/08/hinh-anh-gai-xinh-11.jpg',
  //   username: 'trieu',
  //   publishedDate: '10/10/2012',
  //   like: 18,
  //   title: "This is title of page",
  //   description: "This is description",
  //   body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   tags: ['tag1', 'tag2'],
  //   comments: ['12']
  // };
  public isMyArticle: boolean = false;
  public articleDetail! : ArticleDetail;
  public slug!: any;
  public currentUser!: any;
  public comments: any[] = []
  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .pipe(
      concatMap((param: any) => this.articleService.getSingleArticle(param.get("slug"))),
      map((res: any) => res.article)
    )
    .subscribe(res => {
      this.articleDetail = res;
      const slug = this.articleDetail?.slug;
      this.commentService.getComments(slug)
      .pipe(
        map((res: any) => res.comments)
      )
      .subscribe(response => {
        this.comments = response;

      })
    })




    this.currentUser = JSON.parse(localStorage.getItem('currentUser') as any).username; ;

  }

  addComment(comment: string) {
    const cmt = {
      comment: {
        body: comment,
      }
    }
    const slug = this.articleDetail?.slug;

    this.commentService.postComment(cmt,slug)
    .subscribe(res => {
      console.log(res.comment);
      this.comments.push(res.comment);
    })
  }

  onDeleteComment(id: any){
    const slug = this.articleDetail?.slug;
    const listComment = this.comments;
    const index = listComment.findIndex(comment => comment.id == id);
    listComment.splice(index, 1);
    this.comments = listComment;
    this.commentService.deleteComment(id, slug).subscribe(data => {console.log(data)})
  }
}
