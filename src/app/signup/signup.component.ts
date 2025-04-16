import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf, RouterModule, RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username: string = "";
  password: string = "";
  email: string = "";

  constructor(
    private toastr: ToastrService,
    private router: Router, 
    private auth: AuthenticationService
  ) {}

 // ...existing code...

onSubmit(signinForm: any) {
  let userMatch = this.auth.userExist(this.username);
  let emailMatch = this.auth.emailExist(this.email);

  if(userMatch) {
    this.toastr.warning('Username Already Exists!', 'Warning');
    return;
  }

  if(emailMatch) {
    this.toastr.warning('Email Already Exists!', 'Warning');
    return;
  }

  let result = this.auth.sign(this.username, this.password, this.email);
  if(result) {
    this.toastr.success(`Sign Up successful ${this.username}!`, 'Success');
    this.router.navigate(['/login']);
    signinForm.reset();
  } else {
    this.toastr.error('Some Error Occurred!', 'Error');
  }
}

}