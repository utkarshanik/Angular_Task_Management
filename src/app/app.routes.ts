import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component:LoginComponent },
  { path: 'sign', component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'project',component:ProjectComponent},
  {path:'task',component:TaskComponent},
  
];

