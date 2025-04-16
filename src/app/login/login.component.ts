import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, FormsModule, NgIf, ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";
  email: string = "";

  constructor(
    private router: Router,
    private toastr: ToastrService, 
    private auth2: AuthenticationService
  ) {}

  onSubmit(loginForm: any) {
    let result = this.auth2.login(this.username, this.password, this.email);
    if(result) {
      this.toastr.success(`Login Successful <span class="toastr-username">${this.username}</span> !!!`, 'Success');
      this.router.navigate(['/home']);
    } else {
      this.toastr.error(`Invalid Credentials`, 'Error');
      loginForm.reset();
    }
  }

// ...existing code...

showResetForm: boolean = false;
newPassword: string = '';

forgotPassword() {
  if (!this.email) {
    this.toastr.error('Please enter your email address first', 'Error');
    return;
  }
  else
  {
    this.toastr.success('Reset Link Sent To Email', 'Success');
  }
  this.showResetForm = true;
}


// ...existing code...

}