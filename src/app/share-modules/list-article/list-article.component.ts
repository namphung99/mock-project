import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { ArticleGet } from 'src/app/shares/interfaces/article.interface';
import { ModalConfirmLoginComponent } from '../modal-confirm-login/modal-confirm-login.component';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent implements OnInit {
  @Input()
  articles: ArticleGet[] = []
  @Output() changeTag = new EventEmitter();
  public username: string = ""

  constructor(
    private router: Router,
    private articleService: ArticleService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser') ?
      JSON.parse(localStorage.getItem('currentUser') || '').username : "";
  }

  openModal() {
    const modalRef = this.modalService.open(ModalConfirmLoginComponent, { centered: true });
    modalRef.componentInstance.name = 'Confirm Login';
  }

  onChangeTag(tag: string[]) {
    this.changeTag.emit(tag);
  }

  viewDetailArticle(slug: any) {
    this.router.navigate(['article', slug])
  }

  handleLike(slug: string, favorited: boolean) {
    this.articleService.handelArticleFavorite(slug, !favorited)
  }

  redirectProfilePage(username: string) {
    this.router.navigate(['profile', username]);
  }
}
