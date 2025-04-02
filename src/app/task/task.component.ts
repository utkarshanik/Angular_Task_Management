import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [NavbarComponent,NgFor,NgIf],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {

    projects:any=JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks:any=JSON.parse(localStorage.getItem('tasksItem')|| '[]');

    constructor()
    {
      // console.log(this.projects);
      console.log(this.tasks);
    }

    ngOnInit() {
      this.loadData();
      this.checkIdMatching();
    }
    
    loadData() {
      this.projects = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.tasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
    
      console.log("Projects:", this.projects);
      console.log("Tasks:", this.tasks);

      
    }
    getTasksForProject(projectId: any) {
      return this.tasks.filter((task: any) => task.idproject === projectId);
    }
    
    checkIdMatching() {
      this.tasks.forEach((task: any) => { // Explicitly typing 'task' as 'any'
        const matchingProject = this.projects.find((project: any) => 
          project.id=== task.idproject
        );
    
        if (matchingProject) {
          console.log(` Match found: Task "${task.title}" belongs to Project "${matchingProject.title}"`);
        } else {
          console.log(` No match found for Task "${task.title}" with projectId "${task.idproject}"`);
        }
      });
    }
}
