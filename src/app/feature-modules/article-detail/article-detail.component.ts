import { ModalDeleteArticleComponent } from './../../share-modules/modal-delete-article/modal-delete-article.component';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleDetail } from 'src/app/shares/interfaces/article-detail.interface';
import { CommentService } from 'src/app/services/comment.service';
import { UIService } from 'src/app/services/ui.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalArticleComponent } from 'src/app/share-modules/modal-article/modal-article.component';

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
  content: any;

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
    .subscribe(params => {
      const slug = params.get('slug');
      this.articleService.getSingleArticle(slug as string)
      this.articleService.emitArticleDetail
      .subscribe(res => {
        this.articleDetail = res;
        const currentUserName = JSON.parse(localStorage.getItem('currentUser') as any).username;
        const userInArticle = this.articleDetail.author.username;

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
    })

  }

  open(slug: string) {
    this.articleService.setArticleSlug(slug);
    const modalRef = this.modalService.open(ModalDeleteArticleComponent);
    modalRef.componentInstance.name = 'DeleteArticle';
  }

  addComment(comment: string) {
    if(comment.trim() !== ""){
      const cmt = {
        comment: {
          body: comment,
        }
      }
      const slug = this.articleDetail?.slug;

      this.commentService.postComment(cmt,slug)
      .subscribe(res => {
        this.comments.push(res.comment);
      })
    }
  }

  onDeleteComment(id: any){
    const slug = this.articleDetail?.slug;
    const listComment = this.comments;
    const index = listComment.findIndex(comment => comment.id == id);
    listComment.splice(index, 1);
    this.comments = listComment;
    this.commentService.deleteComment(id, slug).subscribe(data => {console.log(data)})
  }

  // handle edit article

  openArticleModal(slug: string) {
    this.uiService.setIsSlug(true);
    this.articleService.setArticleSlug(slug);
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }
}
