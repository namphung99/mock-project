import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexEmail } from 'src/app/constants/index.constant';
import * as Validations from '../../../shares/Custom-Validator/handleValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  checkConditionInvalid = Validations.checkConditionInvalid;
  checkRequired = Validations.checkRequired;
  checkPattern = Validations.checkPattern;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regexEmail)]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    })
  }
}
