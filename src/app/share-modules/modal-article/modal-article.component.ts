import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from 'src/app/services/article.service';
import { UIService } from 'src/app/services/ui.service';
import { ArticlePost } from 'src/app/shares/interfaces/article.interface';
import * as Validations from '../../shares/Custom-Validator/handleValidator';

@Component({
  selector: 'app-modal-article',
  templateUrl: './modal-article.component.html',
  styleUrls: ['./modal-article.component.scss']
})
export class ModalArticleComponent implements OnInit {
  public checkRequired = Validations.checkRequired;
  public checkConditionInvalid = Validations.checkConditionInvalid;
  public articleGroup: FormGroup;
  public article: ArticlePost = {
    article: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    }
  };

  constructor(
    public fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private articleService: ArticleService,
    private uiService: UIService,
    private toastr: ToastrService,
  ) {
    this.articleGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.uiService.emitSpinner.emit(true);
    this.article = {
      article: {
        ...this.articleGroup.value,
        tagList: this.articleGroup.controls.tagList.value.split(";")
      }
    }

    this.articleService.postArticle(this.article).subscribe((response: any) => {
      this.articleService.setArticle(response.article);
      setTimeout(() => {
        this.uiService.emitSpinner.emit(false);
      }, 500)

      this.toastr.success('', 'Login Success');
    })
    this.activeModal.close();
  }

  onClose() {
    this.activeModal.close()
  }
}
