import { Component, OnInit } from '@angular/core';
import { CredentialsService } from '../credentials.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

  title = "Conclua seu cadastro";
  register: any = {
    completeName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bloodType: '',
    isDonor: 'true',
    Story: {
      hospital: '',
      room: '',
      hospBed: ''
    }
  };

  constructor(
    private _registerService: RegisterService,
    private _credentialsService: CredentialsService
  ) { }

  ngOnInit() {
    this._credentialsService.getUser();
    if(this.register.isDonor == 'false') {
      this.register["Story"] = {
        hospital: '',
        room: '',
        hospBed: ''
      }
    }
  }

  doCompleteRegister() {
    this._registerService.doRegister(this.register);
  }
}
