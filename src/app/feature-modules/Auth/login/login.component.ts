import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regexEmail)]],
      password: [null, [Validators.required]]
    })
  }

  onSubmit(){
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

      this.toastr.success('', 'Login Success', {
        timeOut: 3000,
        progressBar: true
      });
    },
    error => {
      this.toastr.error('Email or password incorrect!', 'Login Fail', {
        timeOut: 3000,
        progressBar: true
      });
    })
  }
}
