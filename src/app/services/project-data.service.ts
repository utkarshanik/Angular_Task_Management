import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  tasks=JSON.parse(localStorage.getItem('tasks') || '[]'); 
  constructor() { }

//Added the Project......... 
  addProject(projectobj:any):boolean
  {
    this.tasks.push(projectobj);
    localStorage.setItem('tasks',JSON.stringify(this.tasks));
    return true;
  }

//Edit Project............... 

//Delete Project............... 

}
