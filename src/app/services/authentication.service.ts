import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
username:any='';
password:any='';

  constructor() { }
  getdata=JSON.parse(localStorage.getItem('user') || '[]' );

//Login Form data......
  login(username:any,password:any)
  {
    const data=this.getdata.find((t:any) => t.username===username && t.password===password )
    if(data)
    {
      const sessiondata={
        user:username,
        session:new Date().getTime()
      }
      sessionStorage.setItem('session',JSON.stringify(sessiondata));
      return true;
    }
    else
    {
      return false;
    }
  }

//Checking  user exist For signup......
  userExist(username:any):boolean
  {
     return this.getdata.some((someuser:any)=> someuser.username=== username);
  }

//Signup Form......
  sign(user:any,pass:any)
  {
    let getdata=JSON.parse(localStorage.getItem('user') || '[]' );
      const data={
        username:user,
        password:pass
      }
      getdata.push(data)
      localStorage.setItem('user',JSON.stringify(getdata));
      return true;
  }

}
