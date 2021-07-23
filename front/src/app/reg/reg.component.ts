import { Component, OnInit } from '@angular/core';
import { FromCheckService } from '../from-check.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  name!: string;
  login!: string;
  email!: string;
  password!: string;
  constructor(public checkSvcForm: FromCheckService, public flashMess: FlashMessagesService) { }

  ngOnInit(): void {
  }

  userRegister() {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password
    }

    if (!this.checkSvcForm.checkName(this.name)) {
      this.flashMess.show('Имя пользователя не введено', {
        cssClass: "alert-danger",
        timeout: 3000
      })
    }
    if (!this.checkSvcForm.checkLogin(this.login)) {
      this.flashMess.show('Логин пользователя не введен', {
        cssClass: "alert-danger",
        timeout: 3000
      })
    }
    if (!this.checkSvcForm.checkEmail(this.email)) {
      this.flashMess.show('Email пользователя не введен', {
        cssClass: "alert-danger",
        timeout: 3000
      })
    }
    if (!this.checkSvcForm.checkPassword(this.password)) {
      this.flashMess.show('Пароль пользователя не введен', {
        cssClass: "alert-danger",
        timeout: 3000
      })
    }

    console.log('register')
    console.log('-', this.name)
    console.log('-', this.login)
    console.log('-', this.email)
    console.log('-', this.password)
    return false;
  }

}
