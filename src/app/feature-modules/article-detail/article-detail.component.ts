import { AuthService } from 'src/app/services/auth.service';
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
import { ModalConfirmLoginComponent } from 'src/app/share-modules/modal-confirm-login/modal-confirm-login.component';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
  public isMyArticle: boolean = false;
  public articleDetail!: ArticleDetail;
  public slug!: any;
  public comments: any[] = [];
  public currentUserName!: string;
  public avatar!: string;
  public username: string = ""

  constructor(
    private modalService: NgbModal,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private uiService: UIService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.username = localStorage.getItem('currentUser') ?
      JSON.parse(localStorage.getItem('currentUser') || '').username : "";
    this.activatedRoute.paramMap

      // get slug article
      .subscribe(params => {
        const slug = params.get('slug');
        this.slug = slug;
        this.articleService.getSingleArticle(slug as string)
        this.articleService.emitArticleDetail

          // get article detail
          .subscribe(res => {
            this.articleDetail = res;
            const currentUserName = JSON.parse(localStorage.getItem('currentUser') as any)?.username;
            const userInArticle = this.articleDetail.author.username;
            this.currentUserName = currentUserName;
            this.avatar = localStorage?.getItem('avatar') as any;

            // check user's post
            if (userInArticle === currentUserName) {
              this.isMyArticle = true;
            }

            // get comments in article
            this.commentService.getComments(this.slug)
              .pipe(
                map((res: any) => res.comments)
              )
              .subscribe(response => {
                // get comment and sort by date
                this.comments = response.sort((a: any, b: any) => {
                  let dateA = new Date(a.createdAt) as any
                  let dateB = new Date(b.createdAt) as any
                  return dateB - dateA
                })
              })
          },
          err => {
            console.log('Error 1');
            
          })
        }
      )

  }

  addComment(comment: string) {
    if (comment.trim() !== "") {
      const cmt = {
        comment: {
          body: comment,
        }
      }

      this.commentService.postComment(cmt, this.slug)
        .subscribe(res => {
          this.comments.unshift({
            ...res.comment,
            author: {
              username: this.currentUserName,
              image: this.avatar
            }
          })
        })
    }
  }

  onDeleteComment(id: any) {
    this.uiService.emitSpinner.emit(true);
    setTimeout(() => {
      const listComment = this.comments;
      const index = listComment.findIndex(comment => comment._id == id);
      listComment.splice(index, 1);
      this.comments = listComment;
      this.commentService.deleteComment(id, this.slug)
        .subscribe(res => {
          this.uiService.emitSpinner.emit(false);
          this.toastr.success('', 'Delete comment success');
        },
          error => {
            this.uiService.emitSpinner.emit(false);
            this.toastr.error('', 'Delete comment failed');
          })
    }, 500)
  }

  onDeleteArticle(slug: string) {
    this.uiService.emitSpinner.emit(true);
    setTimeout(() => {
      this.articleService.deleteArticle(slug)
        .subscribe(res => {
          this.uiService.emitSpinner.emit(false);
          this.toastr.success('', 'Delete article success');
          this.router.navigate(['/home']);
        },
          error => {
            this.uiService.emitSpinner.emit(false);
            this.toastr.error('', 'Delete article failed');
          })
    }, 500)
  }


  // handle edit article

  openArticleModal(slug: string) {
    this.uiService.setIsSlug(true);
    this.articleService.setArticleSlug(slug);
    const modalRef = this.modalService.open(ModalArticleComponent);
    modalRef.componentInstance.name = 'Article';
  }

  getIsLogin() {
    return this.auth.getIsLoggedIn();
  }

  handleLike(slug: string, favorited: boolean) {
    this.articleService.handelArticleFavorite(slug, !favorited)
  }

  openModal() {
    const modalRef = this.modalService.open(ModalConfirmLoginComponent, { centered: true });
    modalRef.componentInstance.name = 'Confirm Login';
  }
}
