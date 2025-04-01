import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink,RouterOutlet,RouterLinkActive,FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username:string="";
  password:string=""

  constructor(private router: Router) {}
  onSubmit() {
    if(this.username==="utkarsha" && this.password==="12345")
    {
      this.router.navigate(['/home']);
    }
    else
    {
      alert('Invalid credentials');
    }
  }

}
