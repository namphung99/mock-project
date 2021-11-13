import { MarkdownPaserService } from './../../services/markdown-paser.service';
import { ArticleDetail } from 'src/app/shares/interfaces/article-detail.interface';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ArticleService } from 'src/app/services/article.service';
import { UIService } from 'src/app/services/ui.service';
import { ArticlePost } from 'src/app/shares/interfaces/article.interface';
import * as Validations from '../../shares/Custom-Validator/handleValidator';
import { MdEditorOption } from 'ngx-markdown-editor';

@Component({
  selector: 'app-modal-article',
  templateUrl: './modal-article.component.html',
  styleUrls: ['./modal-article.component.scss']
})
export class ModalArticleComponent implements OnInit {
  public checkRequired = Validations.checkRequired;
  public checkConditionInvalid = Validations.checkConditionInvalid;
  public articleGroup!: FormGroup;
  public article: ArticlePost = {
    article: {
      title: "",
      description: "",
      body: "",
      tagList: [],
    }
  };
  public slug!: any;
  public isSlug!: boolean;
  public articleDetail! : ArticleDetail;
  public covertedText!: string;

  constructor(
    public fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private articleService: ArticleService,
    private uiService: UIService,
    private toastr: ToastrService,
    private router: Router,
    private md: MarkdownPaserService
  ) {}


  ngOnInit(): void {

    this.articleGroup = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: ['', Validators.required]
    })

    this.isSlug =  this.uiService.getIsSlug();

    this.slug = this.articleService.getArticleSlug();
    if(this.slug && this.isSlug == true){
      this.articleService.getSingleArticle(this.slug)
      this.articleService.emitArticleDetail
      .subscribe(res => {
        this.articleDetail = res;
        this.covertedText = this.articleDetail.body;
        this.articleGroup.patchValue({
          title: this.articleDetail.title,
          description: this.articleDetail.description,
          body: this.articleDetail.body,
          tagList: this.articleDetail.tagList,
        })
      })
    }

    // reset flag slug
    if(!this.isSlug){
      this.slug = undefined;
    }
  }

  onSubmit() {
    this.uiService.emitSpinner.emit(true);
    if(this.slug){
      let tags =[ this.articleGroup.controls.tagList.value[0]];
      if(this.articleGroup.controls.tagList.value.includes(';')){
        tags = this.articleGroup.controls.tagList.value.split(';')
      }
      this.article = {
        article: {
          ...this.articleGroup.value,
          tagList: tags
        }
      }

      this.handleEditArticle(this.article)

    }
    else{
      this.article = {
        article: {
          ...this.articleGroup.value,
          tagList: this.articleGroup.controls.tagList.value.split(";")
        }
      }

      this.articleService.postArticle(this.article).subscribe((response: any) => {
        this.articleService.getTags()
        this.articleService.setArticle(response.article);
        setTimeout(() => {
          this.uiService.emitSpinner.emit(false);
        }, 300)

        this.toastr.success('', 'Post Article Success');
      },
      error => {
        this.uiService.emitSpinner.emit(false);
        this.toastr.error('','Post failed, please check the internet again');
      })
    }
    this.activeModal.close();
  }

  handleEditArticle(article: ArticlePost) {
    setTimeout(() => {
      this.articleService.editArticle(this.slug, article)
      .pipe(
        map((res: any) => res.article)
      )
      .subscribe(response => {
        this.uiService.emitSpinner.emit(false);
        this.toastr.success('', 'Update article success');
        this.articleService.emitArticleDetail.emit(response)
      },
      err => {
        this.uiService.emitSpinner.emit(false);
        this.toastr.error('', 'Update failed,  please check the internet again');
      })
    }, 500)
  }

  onClose() {

    this.articleGroup.reset()
    this.articleService.setArticleSlug('')
    this.activeModal.close()
  }

  // markdown

  updateOutput(event: any){
    const mdText = event.target.value;
    this.covertedText = this.md.convert(mdText);

  }
}
