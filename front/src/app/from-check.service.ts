import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FromCheckService {

  constructor() { }

  checkName(name:any){
    if(name == undefined){
      return false;
    }else{
      return true;
    }
  }

  checkLogin(login:any){
    if(login == undefined){
      return false;
    }else{
      return true;
    }
  }

  checkEmail(email:any){
    if(email == undefined){
      return false;
    }else{
      return true;
    }
  }

  checkPassword(password:any){
    if(password == undefined){
      return false;
    }else{
      return true;
    }
  }
}
