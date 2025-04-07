import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task',
  imports: [NavbarComponent,NgFor,NgIf,FormsModule,NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})

export class TaskComponent {
  
  tasktitle:string='';
  taskdesc:string = '';
  taskcreated:string = '';
  taskmanager:string = '';
  tasktime:string = '';
  projetcid:string='';
  projecttitle:string='';
  proid: string = '';
  
  taskList: any[] = [];
  projectList: any[] = [];
  projects: any[] = [];
  tasks: any[] = [];
  
  // projects:any=JSON.parse(localStorage.getItem('tasks') || '[]')
  // tasks:any=JSON.parse(localStorage.getItem('tasksItem')|| '[]');
  
  constructor(private toast: ToastrService, private route :ActivatedRoute){  }
  
  // proid:string='';
    ngOnInit() {
      this.loadData();
      // this.checkIdMatching();
      this.route.queryParams.subscribe(params => {
        this.proid = params['projectid'];
        this.loadTasksForProject();
      });
    }

    loadData() {
      this.projects = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.tasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
    }
    
    loadTasksForProject() {
      this.taskList = this.tasks.filter(task => task.idproject == this.proid);
      this.projectList = this.projects.filter(task => task.id == this.proid );
      this.projecttitle=this.projectList[0].title;
      // console.log(this.projectList[0].title);
      
      
      if (this.taskList.length === 0) {
        this.toast.error("No task found", "Error");
      }

    }
    
    getTasksForProject() {
      return this.taskList;
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
     
        } else {
          this.toast.info('Deletion canceled.', 'Info');
        }
      });
      }

      selectedTaskID: number | null = null;
      projetcID: any ='';
      
      updateTask(updatetask:any)
      {
        console.log(updatetask);
        this.selectedTaskID=updatetask;
        this.projetcID=this.proid;
        console.log(this.projetcID);

        let existingTasks = JSON.parse(localStorage.getItem('tasksItem') || '[]');
        
        let update=existingTasks.find((updateid:any)=> updateid.taskid==updatetask)
        console.log(update);
        
        this.tasktitle = update.title || '';
        this.taskdesc = update.desc || '';
        this.taskcreated = update.created || '';
        this.taskmanager = update.manager || '';
        this.tasktime = update.time || '';
    
        // console.log(this.tasktitle);
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

        if(taskindex===-1)
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

          this.loadData();               // Reload localStorage into tasks array
          this.loadTasksForProject(); 
       
        }

        colorchange(value:any)
        {
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
