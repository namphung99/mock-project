import { regexEmail } from 'src/app/constants/index.constant';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Validations from '../../../shares/Custom-Validator/handleValidator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  patternEmail: string = '^[\\w]{1,}[\\w.+-]{0,}@[\\w-]{2,}([.][a-zA-Z]{2,}|[.][\\w-]{2,}[.][a-zA-Z]{2,})$';
  checkConditionInvalid = Validations.checkConditionInvalid;
  checkRequired = Validations.checkRequired;
  checkPattern = Validations.checkPattern;

  user = {
    avatarUrl: 'link của ảnh',
    username: 'Day la username',
    bio: 'This is bio',
    email: 'hello@hello.hello',
    password: 'hello'
  }

  constructor(private formSetting: FormBuilder) { }

  profileForm = this.formSetting.group({
    avatarUrl: [this.user.avatarUrl],
    username: [this.user.username, Validators.required],
    bio: [this.user.bio],
    email: [this.user.email, [Validators.required, Validators.pattern(regexEmail)]],
    oldPassword: [''],
  });

  ngOnInit(): void { }

  handleFormSubmission(): void {
    console.log('Hello');
    
  }
}
