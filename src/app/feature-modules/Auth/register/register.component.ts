import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { regexEmail } from 'src/app/constants/index.constant';
import { AuthService } from 'src/app/services/auth.service';
import { UIService } from 'src/app/services/ui.service';
import { comparePassword } from 'src/app/shares/Custom-Validator/CustomValidator';
import * as Validations from '../../../shares/Custom-Validator/handleValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isRegister: boolean = true;
  emailErrorResponse!: string;
  usernameErrorResponse!: string;
  checkConditionInvalid = Validations.checkConditionInvalid;
  checkRequired = Validations.checkRequired;
  checkPattern = Validations.checkPattern;
  checkRequiredGR = Validations.checkRequiredGR;
  checkComparePassword = Validations.checkComparePassword;
  checkMinLength = Validations.checkMinLength;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private uiService: UIService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regexEmail)]],
      username: [null, [Validators.required]],
      pw: this.fb.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      },{
        validator: comparePassword
      })
    })
  }

  onSubmit() {
    // toggle spinner
    this.uiService.emitSpinner.emit(true)
    const user = {
      user: {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.pw.password,
      }
    }
    setTimeout(() => {
      this.authService.registration(user)
      .subscribe(response => {
        this.uiService.emitSpinner.emit(false);

        // emit isLoggedIn
        this.authService.logUserIn(response);
        this.toastr.success('', 'Register success');
        this.router.navigate(['/'])

      },
      error => {
        this.uiService.emitSpinner.emit(false);

        const errorResponse = error.error.errors;
        this.emailErrorResponse = errorResponse?.email;
        this.usernameErrorResponse = errorResponse?.username;

        if(this.emailErrorResponse && !this.usernameErrorResponse){
          this.toastr.error(`Email ${this.emailErrorResponse}`, 'Register failed');
        }
        else if(this.usernameErrorResponse && !this.emailErrorResponse){
          this.toastr.error(`Username ${this.usernameErrorResponse}`, 'Register failed');
        }
        else if(this.emailErrorResponse && this.usernameErrorResponse){
          this.toastr.error(`Username & email ${this.usernameErrorResponse}`, 'Register failed');
        }
      })
    }, 500)
  }
}
