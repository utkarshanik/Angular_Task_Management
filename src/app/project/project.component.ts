import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { takeLast } from 'rxjs';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [NavbarComponent,NgFor,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  //For Task Details
  taskid=undefined;
  tasktitle:string='';
  taskdesc: string = '';
  taskcreated: string = '';
  taskmanager: string = '';
  tasktime:string = '';
  projetcid:string='';

  // For Project Update details
  id=undefined;
  title:string='';
  desc: string = '';
  created: string = '';
  manager: string = '';
  startdate: string = '';
  enddate: string = '';
  team: string = '';
  duedate:string = '';
  time:string = '';

  addtask(project:string)
  {
    console.log(project);
    this.projetcid=project;
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Title:', this.tasktitle);
    console.log('Description:', this.taskdesc);
    console.log('Created By:', this.taskcreated);
    console.log('Manager:', this.taskmanager);
    console.log('Time:', this.tasktime);
  
    if (!this.tasktitle || !this.taskdesc || !this.taskcreated || !this.taskmanager || !this.tasktime ) {
      alert('Please fill in all fields');
      return;
    }
    const tasksItem = JSON.parse(localStorage.getItem('tasksItem') || '[]');

    let newId = tasksItem.length > 0 ? tasksItem[tasksItem.length - 1].taskid + 1 : 1;

    const newTask = {
      taskid:newId, 
      title: this.tasktitle,
      desc: this.taskdesc,
      created: this.taskcreated,
      manager: this.taskmanager,
      time:this.tasktime,
      idproject:this.projetcid
    };

    tasksItem.push(newTask);

    localStorage.setItem('tasksItem', JSON.stringify(tasksItem));

    this.tasktitle = '';
    this.taskdesc = '';
    this.taskcreated = '';
    this.taskmanager = '';
    this.tasktime='';

    alert('Task added successfully!');
  }
  //SHOwing the data from LocalStorage....
  taskdata: any[] = JSON.parse(localStorage.getItem('tasks') || '[]'); 

//Deleting the data...
deleteTask(taskId: number): void {
  // Retrieve tasks from localStorage
  let existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Filter out the task with the given ID
  let updatedTasks = existingTasks.filter((task: any) => task.id !== taskId);

  // Update localStorage with the new list
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));

  alert('Task deleted successfully!');
}

}
