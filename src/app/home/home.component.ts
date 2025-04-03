import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,FormsModule,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private toast:ToastrService,private router:Router){}
  id=undefined;
  title:string='';
  desc: string = '';
  created: string = '';
  manager: string = '';
  startdate: string = '';
  enddate: string = '';
  team: string = '';
  duedate:string = '';
  
  
  onSubmit(event: Event,projectForm:any) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Title:', this.title);
    console.log('Description:', this.desc);
    console.log('Created By:', this.created);
    console.log('Manager:', this.manager);
    console.log('Start Date:', this.startdate);
    console.log('End Date:', this.enddate);
    console.log('Team:', this.team);
    console.log('Due Date:', this.duedate);
    if (!this.title || !this.desc || !this.created || !this.manager || !this.startdate || !this.enddate || !this.team || !this.duedate) {
      alert('Please fill in all fields');
      return;
    }
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    let newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    
    const newTask = {
      id:newId, 
      title: this.title,
      desc: this.desc,
      created: this.created,
      manager: this.manager,
      startdate: this.startdate,
      enddate: this.enddate,
      team: this.team,
      duedate: this.duedate
    };
    
    tasks.push(newTask);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.toast.success("Task Added Successfully !!!")
    
    

    projectForm.reset();
  
    
  }
  
  
}
