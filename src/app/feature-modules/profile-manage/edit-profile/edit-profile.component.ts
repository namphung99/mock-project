import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { regexEmail } from 'src/app/constants/index.constant';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as Validations from '../../../shares/Custom-Validator/handleValidator';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  [x: string]: any;
  checkConditionInvalid = Validations.checkConditionInvalid;
  checkRequired = Validations.checkRequired;
  checkPattern = Validations.checkPattern;
  currentUser ?: any;
  profileForm ?: any;

  constructor(
    private formSetting: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService.getUsernameFromCurrentUser().subscribe(m => {
      this.username = m;
      this.userService.getProfilesUser(this.username).subscribe(m => {
        this.userService.getEmail().subscribe(res => {
          this.currentUser = m;
          this.createForm(this.currentUser, res);
        })
      })
    });
  }

  createForm(currentUser: any, email: string){
    this.profileForm = this.formSetting.group({
      email: [email, [Validators.required, Validators.pattern(regexEmail)]],
      image: [currentUser.profile.image],
      bio: [currentUser.profile.bio]
    });
  }

  handleFormSubmission(): void {
    let image = this.profileForm.value.image;
    localStorage.setItem('avatar', image);
    let user = {
      user: this.profileForm.value
    }
    
    this.userService.editUser(user);
    this.router.navigate(['/profile/' + JSON.parse(localStorage.getItem('currentUser') || '{}').username]);
  }
}
