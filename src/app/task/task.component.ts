import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-task',
  imports: [NavbarComponent,NgFor,NgIf,FormsModule,NgClass],
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

    constructor(private toast: ToastrService)
    {

    }

    ngOnInit() {
      this.loadData();
      this.checkIdMatching();
    }
    
    loadData()
     {
      this.projects = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.tasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
     }

    getTasksForProject(projectId: any) {
      return this.tasks.filter((task: any) => task.idproject === projectId);
    }
    
    checkIdMatching() {
      this.tasks.forEach((task: any) => { // Explicitly typing 'task' as 'any'
        const matchingProject = this.projects.find((project: any) => 
          project.id=== task.idproject
        );
      });
    }

    //Delete the task.....
    deleteTask(taskid:number):void
    {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          let existingTasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
          let deleteTask=existingTasks.filter((t:any)=>t.taskid!==taskid)
          console.log(deleteTask);
          localStorage.setItem('tasksItem',JSON.stringify(deleteTask))
       
          this.toast.success('Project deleted successfully!', 'Success');
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.toast.info('Deletion canceled.', 'Info');
        }
      });
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
          this.toast.success('Task Updated Successfuly !')
          setTimeout(() => {
            window.location.reload();
          }, 3000); 
        }

        colorchange(value:any)
        {
          console.log(value);
          
            if(value==='Pending')
            {
              return 'bg-danger text-light ';
            }
            else if(value==='In Progress'){
              return 'bg-warning';

            }
            else{
              return 'bg-success';
            }
      }
}
