import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { regexEmail } from 'src/app/constants/index.constant';
import { AuthService } from 'src/app/services/auth.service';
import * as Validations from '../../../shares/Custom-Validator/handleValidator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  checkConditionInvalid = Validations.checkConditionInvalid;
  checkRequired = Validations.checkRequired;
  checkPattern = Validations.checkPattern;
  loginInvalid: boolean = false;
  isLogin: boolean = false;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regexEmail)]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit(){
    this.isLogin = true;
    const user = {
      user : {
        ...this.loginForm.value,
      }
    }

    this.authService.login(user)
    .subscribe(response => {
      this.authService.logUserIn(response);
      console.log(response)
      this.router.navigate(['/home']);
    },
    error => {
      this.loginInvalid = true;
    })
  }
}
