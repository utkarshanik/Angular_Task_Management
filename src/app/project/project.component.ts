import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FilterProjectsPipe } from '../pipe/filter-projects.pipe';


@Component({
  selector: 'app-project',
  imports: [NavbarComponent, NgFor, FormsModule, NgIf,FilterProjectsPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {
  constructor(private toast: ToastrService,private router: Router) { }
  searchText: string = '';

  //For Task Details
  taskid = undefined;
  tasktitle: string = '';
  taskdesc: string = '';
  taskcreated: string = '';
  taskmanager: string = '';
  tasktime: string = '';
  projetcid: string = '';

  // For Project Update details
  id = undefined;
  title: string = '';
  desc: string = '';
  created: string = '';
  manager: string = '';
  startdate: string = '';
  enddate: string = '';
  team: string = '';
  duedate: string = '';
  time: string = '';

  addtask(project: string) {
    console.log(project);
    this.projetcid = project;
  }
  onSearch(event: Event) {
    event.preventDefault();
  }
  

  onSubmit(event: Event, form: any) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log('Title:', this.tasktitle);
    console.log('Description:', this.taskdesc);
    console.log('Created By:', this.taskcreated);
    console.log('Manager:', this.taskmanager);
    console.log('Time:', this.tasktime);

    if (!this.tasktitle || !this.taskdesc || !this.taskcreated || !this.taskmanager || !this.tasktime) {
      alert('Please fill in all fields');
      return;
    }
    const tasksItem = JSON.parse(localStorage.getItem('tasksItem') || '[]');

    let newId = tasksItem.length > 0 ? tasksItem[tasksItem.length - 1].taskid + 1 : 1;

    const newTask = {
      taskid: newId,
      title: this.tasktitle,
      desc: this.taskdesc,
      created: this.taskcreated,
      manager: this.taskmanager,
      time: this.tasktime,
      idproject: this.projetcid
    };

    tasksItem.push(newTask);

    localStorage.setItem('tasksItem', JSON.stringify(tasksItem));

    form.reset();
    this.toast.success("Task Added Successfully !!!")

  }
  //SHOwing the data from LocalStorage....
  taskdata: any[] = JSON.parse(localStorage.getItem('tasks') || '[]');

  selectedTaskID: number | null = null;
  //Updating the task
  fillUpdateForm(taskID: number) {
    this.selectedTaskID = taskID;
    let task = this.taskdata.find(t => t.id === taskID);
    console.log(task);

    if (!task) {
      console.error("Task not found!");
      return;
    }

    // Set form fields
    this.title = task.title || '';
    this.desc = task.desc || '';
    this.created = task.created || '';
    this.manager = task.manager || '';
    this.startdate = task.startdate || '';
    this.enddate = task.enddate || '';
    this.team = task.team || '';
    this.duedate = task.duedate || '';
  }

  AddUpdate() {
    // Prevent default form submission behavior
    if (this.selectedTaskID === null) {
      console.error("No task selected for update!");
      return;
    }

    // Find the index of the task to be updated
    let taskIndex = this.taskdata.findIndex(t => t.id === this.selectedTaskID);

    if (taskIndex === -1) {
      console.error("Task not found in localStorage!");
      return;
    }

    console.log(taskIndex);

    // Update the task data
    this.taskdata[taskIndex] = {
      id: this.selectedTaskID,
      title: this.title,
      desc: this.desc,
      created: this.created,
      manager: this.manager,
      startdate: this.startdate,
      enddate: this.enddate,
      team: this.team,
      duedate: this.duedate
    };
    console.log(this.taskdata);

    // Save updated data back to localStorage
    localStorage.setItem('tasks', JSON.stringify(this.taskdata));

    // Reset the selected task ID
    this.selectedTaskID = null;

    this.toast.success("Task Updated Successfully !!!")

  }

  //Deleting the data...
  deleteTask(taskId: number): void {
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

        let existingTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

        let updatedTasks = existingTasks.filter((task: any) => task.id !== taskId);

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));


        this.toast.success('Project deleted successfully!', 'Success');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        this.toast.info('Deletion canceled.', 'Info');
      }
    });
  }

  viewtask(taskId: string)
   {
        this.router.navigate(['/task'],{
        queryParams: { projectid:taskId}
      })
    
    } 


}
