import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    title: "",
    description: "",
    body: "",
    tagList: "",
  };

  constructor(
    public fb: FormBuilder,
    private activeModal: NgbActiveModal
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
    this.activeModal.close()
  }

  onClose() {
    this.activeModal.close()
  }
}
