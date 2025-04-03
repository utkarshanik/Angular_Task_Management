import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [NavbarComponent,NgFor,NgIf,FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  
  tasktitle:string='';
  taskdesc: string = '';
  taskcreated: string = '';
  taskmanager: string = '';
  tasktime:string = '';
  projetcid:string='';

    projects:any=JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks:any=JSON.parse(localStorage.getItem('tasksItem')|| '[]');

    constructor()
    {

    }

    ngOnInit() {
      this.loadData();
      this.checkIdMatching();
    }
    
    loadData() {
      this.projects = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.tasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
    
      // console.log("Projects:", this.projects);
      // console.log("Tasks:", this.tasks);

      
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
          // console.log(` Match found: Task "${task.title}" belongs to Project "${matchingProject.title}"`);
        } else {
          // console.log(` No match found for Task "${task.title}" with projectId "${task.idproject}"`);
        }
      });
    }

    //Delete the task.....
    deleteTask(taskid:number):void
    {
      console.log(taskid);
      let existingTasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
        let deleteTask=existingTasks.filter((t:any)=>t.taskid!==taskid)
        console.log(deleteTask);
        localStorage.setItem('tasksItem',JSON.stringify(deleteTask))
        alert("Deleted successfully")
      }


      selectedTaskID: number | null = null;
      projetcID: number | null = null;
      updateTask(updatetask:any,project:any)
      {
        console.log(updatetask);
        this.selectedTaskID=updatetask;
        this.projetcID=project;
        console.log(this.projetcID);
        

        let existingTasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
        // console.log(existingTasks);
        
        let update=existingTasks.find((updateid:any)=> updateid.taskid==updatetask)
        console.log(update);
        
        this.tasktitle = update.title || '';
        this.taskdesc = update.desc || '';
        this.taskcreated = update.created || '';
        this.taskmanager = update.manager || '';
        this.tasktime = update.time || '';
    
        console.log(this.tasktitle);
        
      }

      updateSubmit()
      {

        console.log(this.projetcID);
        
        if(this.selectedTaskID===null)
        {
          console.error("No form Updated")
          return;
        }
      
        // console.log(this.selectedTaskID);

        let taskindex=this.tasks.findIndex((taski:any)=> taski.taskid=== this.selectedTaskID)

        if(taskindex==-1)
        {
          console.error("Task not found in localStorage!");
          return;
        }

        console.log(this.tasktitle);

          this.tasks[taskindex]=
          {
            idproject:this.projetcID,
            taskid:this.selectedTaskID,
            title:this.tasktitle ,
            desc:this.taskdesc ,
            created:this.taskcreated ,
            manager:this.taskmanager ,
            time:this.tasktime 
          }
        console.log(this.tasks);
          
          localStorage.setItem('tasksItem',JSON.stringify(this.tasks))

          this.selectedTaskID=null;
          alert("Task Updated")
      }


}
