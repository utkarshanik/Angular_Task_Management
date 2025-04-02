import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [NavbarComponent,NgFor],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {

    // projects:any=JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks:any=JSON.parse(localStorage.getItem('tasksItem')|| '[]');

    constructor()
    {
      // console.log(this.projects);
      console.log(this.tasks);
    }

}
