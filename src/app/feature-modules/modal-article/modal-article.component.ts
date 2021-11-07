import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/shares/interfaces/article.interface';
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
  public article: Article = {
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
    private articleService: ArticleService
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
    this.article = {
      article: {
        ...this.articleGroup.value,
        tagList: this.articleGroup.controls.tagList.value.split(";")
      }
    }


    // this.articleService.postArticle(this.article).subscribe(response => {
    //   console.log(response)
    // })

    this.activeModal.close()
  }

  onClose() {
    this.activeModal.close()
  }
}