import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string="";
  password:string=""

  constructor(private router: Router,private toastr: ToastrService) {}
  onSubmit() {
    if(this.username==="Utkarsha" && this.password==="12345")
    {
      this.toastr.success(`Login successful ${this.username} !`, 'Success');
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
  