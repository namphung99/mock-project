import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { USER_LOGIN } from 'src/app/shares/interfaces/user-login.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
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
      this.router.navigate(['/home']);
    },
    error => {
      console.log(error)
    })
  }



  checkConditionInvalid(message: string): boolean {
    if(this.loginForm.get(message)?.invalid && this.loginForm.get(message)?.touched){
      return true;
    }
    return false;
  }

  checkRequired(message: string) : boolean {
    if(this.loginForm.get(message)?.hasError('required')){
      return true;
    }
    return false;
  }

  checkPattern(message: string) : boolean {
    if(this.loginForm.get(message)?.hasError('pattern')){
      return true;
    }
    return false;
  }

}
