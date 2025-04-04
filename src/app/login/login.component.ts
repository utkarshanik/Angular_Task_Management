import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FormsModule,NgIf,ToastrModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string="";
  password:string=""

  constructor(private router: Router,private toastr: ToastrService) {}
  onSubmit() {

    let userData= JSON.parse(localStorage.getItem('user') || '[]');
    let match= userData.find((matchid:any)=> matchid.username=== this.username && matchid.password=== this.password)

    if(match)
    {
      this.toastr.success(`Login successful <span class="toastr-username");">${this.username}</span> !`, 'Success', {enableHtml:true});
     
      this.router.navigate(['/home']);
    }
    else
    {
       this.toastr.error('Invalid credentials', 'Error');
        this.username=''
        this.password=''
    }

  }

}
  