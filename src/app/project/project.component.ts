import { Component, NgModule } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FilterProjectsPipe } from '../pipe/filter-projects.pipe';
import { SortDataPipe } from '../pipe/sort-data.pipe';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-project',
  imports: [NavbarComponent, NgFor, FormsModule, NgIf,FilterProjectsPipe,SortDataPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})

export class ProjectComponent {

  constructor(private toast: ToastrService,private router: Router) {
    this.today = new Date().toISOString().split('T')[0];
   }
   today: string;

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
  maxTeamMembers: number = 0;

  addtask(project: string) {
    this.projetcid = project;
    // Find the project and set maxTeamMembers
    const projectData = this.taskdata.find(task => task.id === project);
    if (projectData) {
      this.maxTeamMembers = parseInt(projectData.team) || 0;
    }

    // Reset selected members when opening modal
    this.teamMembers.forEach(member => member.selected = false);
    this.selectedMembers = [];
    this.taskdesc = '';
  }

 // Project Update==========>
  AddUpdate() {
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

  //Deleting the Project ======>
  async deleteTask(taskId: number): Promise<void> {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
      });
  
      if (result.isConfirmed) {
        // Update local state and localStorage in one go
        this.taskdata = this.taskdata.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(this.taskdata));
        this.toast.success('Project deleted successfully!', 'Success');
      }
    } catch (error) {
      this.toast.error('Error deleting project', 'Error');
      console.error('Delete error:', error);
    }
  }

// Task submission==========>
  onSubmit(event: Event, form: any) {
    event.preventDefault(); 
    
    if (!this.validateDates()) {
      event.preventDefault();
      return;
    }
    // Prevent default form submission behavior
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

  viewtask(taskId: string)
   {
        this.router.navigate(['/task'],{
        queryParams: { projectid:taskId}
      })
    
    } 

    //Dropdown For Assigned to
    // ...existing code...

  // Add these properties
  teamMembers = [
    { id: 1, name: 'Babli Williams', selected: false },
    { id: 2, name: 'Chintu Mishra', selected: false },
    { id: 3, name: 'Bhidy De Caprio', selected: false },
    { id: 4, name: 'Pintu Bieber', selected: false }
  ];
  showDropdown: boolean = false;
  selectedMembers: string[] = [];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleSelection(member: any) {
    const currentSelectedCount = this.teamMembers.filter(m => m.selected).length;
    
    if (!member.selected && currentSelectedCount >= this.maxTeamMembers) {
      this.toast.warning(`Cannot select more than ${this.maxTeamMembers} members as per project team size`, 'Warning');
      return;
    }
    
    member.selected = !member.selected;
    this.updateSelectedMembers();
  }

  updateSelectedMembers() {
    this.selectedMembers = this.teamMembers
      .filter(member => member.selected)
      .map(member => member.name);
    this.taskdesc = this.selectedMembers.join(', ');
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any) {
    if (!event.target.closest('.dropdown-container')) {
      this.showDropdown = false;
    }
  }
  // ...existing code...

    //Making Some Update filds ReadOnly like manger and created by
    isCreatedByReadOnly: boolean = true;
    isManagerReadOnly: boolean = true;

    // Filter and validation

    //Date Validation......
    dateError: string = '';
    dueDateError: string = '';
    validateDates() {
      if (!this.startdate || !this.enddate || !this.duedate) return true;

      const start = new Date(this.startdate);
      const end = new Date(this.enddate);
      const due = new Date(this.duedate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        this.dateError = 'Start date cannot be in the past';
        return false;
      }

      if (end < start) {
        this.dateError = 'End date must be after start date';
        return false;
      }

      if (due < start || due > end) {
        this.dueDateError = 'Due date must be between start and end date';
        return false;
      }

      this.dateError = '';
      this.dueDateError = '';
      return true;
    }
        // Dragging the Project rows
    draggedItemIndex: number = -1;
    dragStart(index: number) {
      this.draggedItemIndex = index;
    }

    allowDrop(event: DragEvent) {
      event.preventDefault();
    }

    drop(targetIndex: number) {
      const draggedItem = this.taskdata[this.draggedItemIndex];
      this.taskdata.splice(this.draggedItemIndex, 1); 
      this.taskdata.splice(targetIndex, 0, draggedItem); 
    }

    onSearch(event: Event) {
      event.preventDefault();
    }
      //Serach
      searchText: string = '';
      //Sort 
      sortField: string = 'title';
      sortOrder: 'asc' | 'desc' = 'asc';

}
