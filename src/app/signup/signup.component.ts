import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-signup',
  standalone:true,
  imports: [FormsModule,RouterLink,NgIf,RouterModule,RouterOutlet],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username:string="";
  password:string=""

  constructor(private toastr:ToastrService,private router:Router, private auth:AuthenticationService){}

  onSubmit(signinForm:any)
  {
    let match=this.auth.userExist(this.username)
    if(match)
    {
      this.toastr.warning('User Already Exist !!', 'Warning');
    }
    else
    {
        let match=this.auth.sign(this.username,this.password)
      if(match)
      {
        this.toastr.success(`Sign Up successful ${this.username} !`, 'Success');
        this.router.navigate(['/login']);
        signinForm.reset();
      }
      else
      {
        this.toastr.error('Some Error Occured!!', 'Error');
      }
    }
  }
}
