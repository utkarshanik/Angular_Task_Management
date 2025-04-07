import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FormsModule,NgIf,ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username:string="";
  password:string=""

  constructor(private router: Router,private toastr: ToastrService, private auth:AuthenticationService) {}
  onSubmit(loginForm:any) 
  {
    let result= this.auth.login(this.username,this.password);  
      if(result)
      {
        console.log(result);
        this.toastr.success(`Login Succeessful <span class=" toastr-username">${this.username}</span> !!!`,'success')
        this.router.navigate(['/home']);
      }
      else
      {
        console.log(result);
        this.toastr.error(`Invalid Credentials`,'Error')
        loginForm.reset();
      }
  }

}
  