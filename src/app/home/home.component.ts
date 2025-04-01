import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title:string='';
  constructor(){}
  onSubmit(event: Event): void {
    event.preventDefault();

    // Save form data in localStorage
    localStorage.setItem('taskFormData', JSON.stringify({
      title: this.title,  
    }));

    alert('Form data saved to localStorage!');
  }
}
