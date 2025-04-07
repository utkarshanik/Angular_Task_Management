import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProjectDataService } from '../services/project-data.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,FormsModule,NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private toast:ToastrService,private router:Router,private addProject:ProjectDataService){}

  id=undefined;
  title:string='';
  desc: string = '';
  created: string = '';
  manager: string = '';
  startdate: string = '';
  enddate: string = '';
  team: string = '';
  duedate:string = '';
  
  
  onSubmit(event: Event,projectForm:any) 
  {
    event.preventDefault(); // Prevent default form submission behavior
    let tasks=JSON.parse(localStorage.getItem('tasks') || '[]');

    let maxId= tasks.length > 0 ? Math.max(...tasks.map((task:any)=>task.id)) :0;
    let newId=maxId+1;

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
    
    let a= this.addProject.addProject(newTask)
    if(a)
    {
       this.toast.success("Task Added Successfully !!!")
        projectForm.reset();
    }
    
    projectForm.reset();
  }
}
