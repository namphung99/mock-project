import { ModalDeleteArticleComponent } from './../../share-modules/modal-delete-article/modal-delete-article.component';
import { Component, OnInit } from '@angular/core';
import { concatMap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleDetail } from 'src/app/shares/interfaces/article-detail.interface';
import { CommentService } from 'src/app/services/comment.service';
import { UIService } from 'src/app/services/ui.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public isMyArticle: boolean = false;
  public articleDetail! : ArticleDetail;
  public slug!: any;
  public comments: any[] = [];
  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private uiService:UIService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap
    .pipe(
      concatMap((param: any) => this.articleService.getSingleArticle(param.get("slug"))),
      map((res: any) => res.article)
    )
    .subscribe(res => {
      this.articleDetail = res;
      console.log(this.articleDetail)
      const currentUserName = JSON.parse(localStorage.getItem('currentUser') as any).username;
      const userInArticle = this.articleDetail.author.username;
      console.log(userInArticle, currentUserName)

      // check user's post
      if(userInArticle === currentUserName){
        this.isMyArticle = true;
      }

      const slug = this.articleDetail?.slug;
      this.commentService.getComments(slug)
      .pipe(
        map((res: any) => res.comments)
      )
      .subscribe(response => {
        this.comments = response;

      })
    })
  }

  open(slug: string) {
    this.articleService.setArticleSlug(slug);
    const modalRef = this.modalService.open(ModalDeleteArticleComponent);
    modalRef.componentInstance.name = 'DeleteArticle';
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
