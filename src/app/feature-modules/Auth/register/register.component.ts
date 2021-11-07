import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { regexEmail } from 'src/app/constants/index.constant';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(regexEmail)]],
      username: [null, [Validators.required]],
      pw: this.fb.group({
        password: [null, [Validators.required]],
        confirmPassword: [null, [Validators.required]],
      },{
        validator: comparePassword
      })
    })
  }

  checkRequiredGR(form: FormGroup, group: string, control: string){
    if(form.get(group)?.get(control)?.hasError('required') && form.get(group)?.get(control)?.touched){
      return true;
    }
    return false;
  }

  checkComparePassword(form: FormGroup, group: string){
    if(form.hasError('passwordnotmatch', group) && !form.get(group)?.get('confirmPassword')?.hasError('required')){
      return true;
    }
    return false;
  }

  onSubmit() {
    // console.log(this.registerForm.value)
    const user = {
      user: {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.pw.password,
      }
    }
    this.authService.registration(user)
    .subscribe(response => {

      localStorage.setItem('token',response?.user.token);
      this.authService.emitIsLogin.emit(true);
      this.toastr.success('', 'Register success', {
        timeOut: 3000,
        progressBar: true
      });

      this.router.navigate(['/'])

    },
    error => {
      const errorResponse = error.error.errors;
      this.emailErrorResponse = errorResponse?.email;
      this.usernameErrorResponse = errorResponse?.username;

      if(this.emailErrorResponse && !this.usernameErrorResponse){
        this.toastr.error(`Email ${this.emailErrorResponse}`, 'Register failed', {
          timeOut: 3000,
          progressBar: true
        });
      }
      else if(this.usernameErrorResponse && !this.emailErrorResponse){
        this.toastr.error(`Username ${this.usernameErrorResponse}`, 'Register failed', {
          timeOut: 3000,
          progressBar: true
        });
      }
      else if(this.emailErrorResponse && this.usernameErrorResponse){
        this.toastr.error(`Username & email ${this.usernameErrorResponse}`, 'Register failed', {
          timeOut: 3000,
          progressBar: true
        });
      }
    })
  }
}
