import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  username: any = '';
  password: any = '';

  constructor() { }

  // Get fresh data from localStorage
  private getFreshData() {
    return JSON.parse(localStorage.getItem('user') || '[]');
  }

  //Login Form data......
 

  //Checking user exist For signup......
  userExist(username: any): boolean {
    // Get fresh data when checking for existing user
    return this.getFreshData().some((someuser: any) => someuser.username === username);
  }

  //Checking email exist For signup......
  emailExist(email: any): boolean {
    return this.getFreshData().some((user: any) => user.email === email);
  }

  //Signup Form......
sign(user: any, pass: any, email: any) {
  let currentData = this.getFreshData();
  const data = {
    username: user,
    password: pass,
    email: email
  }
  currentData.push(data);
  localStorage.setItem('user', JSON.stringify(currentData));
  return true;
}

login(username: any, password: any, email: any) {
  const data = this.getFreshData().find((t: any) => 
    t.username === username && 
    t.password === password && 
    t.email === email
  );
  if(data) {
    const sessiondata = {
      user: username,
      email: email,
      session: new Date().getTime()
    }
    sessionStorage.setItem('session', JSON.stringify(sessiondata));
    return true;
  }
  return false;
}
// ...existing code...
// resetPassword(email: string, newPassword: string): boolean {
//   let users = this.getFreshData();
//   const userIndex = users.findIndex((user: any) => user.email === email);
  
//   if (userIndex !== -1) {
//     users[userIndex].password = newPassword;
//     localStorage.setItem('user', JSON.stringify(users));
//     return true;
//   }
//   return false;
// }



}