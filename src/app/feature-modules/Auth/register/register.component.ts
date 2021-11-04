import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })

  }

  checkConditionInvalid(message: string): boolean {
    if(this.registerForm.get(message)?.invalid && this.registerForm.get(message)?.touched){
      return true;
    }
    return false;
  }

  checkRequired(message: string) : boolean {
    if(this.registerForm.get(message)?.hasError('required')){
      return true;
    }
    return false;
  }

  checkPattern(message: string) : boolean {
    if(this.registerForm.get(message)?.hasError('pattern')){
      return true;
    }
    return false;
  }

}
