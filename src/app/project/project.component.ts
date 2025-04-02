import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { takeLast } from 'rxjs';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [NavbarComponent,NgFor],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  taskdata: any[] = JSON.parse(localStorage.getItem('tasks') || '[]'); 
  constructor()
  {
    console.log(this.taskdata);
  }


}
