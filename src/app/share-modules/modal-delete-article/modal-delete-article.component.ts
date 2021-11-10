import { ArticleService } from 'src/app/services/article.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UIService } from 'src/app/services/ui.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-delete-article',
  templateUrl: './modal-delete-article.component.html',
  styleUrls: ['./modal-delete-article.component.scss']
})
export class ModalDeleteArticleComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private articleService: ArticleService,
    private uiService:UIService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onClose() {
    this.activeModal.close();
  }

  onConfirm() {
    setTimeout(() => {
    this.uiService.emitSpinner.emit(true);
      this.articleService.deleteArticle(this.articleService.getArticleSlug())
      .subscribe(res => {
        this.uiService.emitSpinner.emit(false);
        this.toastr.success('', 'Delete article success');
        this.router.navigate(['/home']);
      },
      error =>{
        this.uiService.emitSpinner.emit(false);
        this.toastr.error('', 'Delete article failed');
      })
      }, 500)
    this.activeModal.close();
  }
}
