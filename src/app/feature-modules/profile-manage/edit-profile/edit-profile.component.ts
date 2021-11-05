import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  patternEmail: string = '^[\\w]{1,}[\\w.+-]{0,}@[\\w-]{2,}([.][a-zA-Z]{2,}|[.][\\w-]{2,}[.][a-zA-Z]{2,})$';
  constructor(private formSetting: FormBuilder) { }

  profileForm = this.formSetting.group({
    backgroundUrl: [''],
    avatarUrl: [''],
    username: ['', Validators.required],
    bio: [''],
    email: ['',[ Validators.required, Validators.pattern(this.patternEmail) ]],
    oldPassword: [''],
    password: [''],
    confirmPassword: ['']
  });

  ngOnInit(): void {
  }

  handleFormSubmission(event: any): void {
    if (!this.profileForm.valid) {
      alert('Form is invalid');
      return;
    }

    alert('Form is submitted');
  }
}
