import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private toastr:ToastrService,private router:Router){}
  onSubmit()
  {
    let userData= JSON.parse(localStorage.getItem('user') || '[]');
    
    let match=userData.find((matchingpair:any) => matchingpair.username === this.username);

    if(match)
    {
      this.toastr.error('User Already Exist !!', 'Error');
      
    }
    else
    {
      let details=
      {
        username:this.username,
        password:this.password
      }
      userData.push(details);
      localStorage.setItem('user',JSON.stringify(userData));
      this.toastr.success(`Sign Up successful ${this.username} !`, 'Success');
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 3500);
    }


  }


}
