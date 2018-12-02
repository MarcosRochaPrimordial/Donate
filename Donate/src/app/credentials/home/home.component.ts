import { Component } from '@angular/core';
import { HomeService } from './home.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent {

  title: string = "Bem vindo ao Donate";
  login: any = {email: '', password: ''};
  passwordsConfirms: boolean = true;
  register: any = {completeName: '', email: '', password: '', confirmPassword: '', bloodType: '', isDonor: 'true'};

  constructor(
    private _homeService: HomeService
  ) { }

  doLogin() {
    this._homeService.doLogin(this.login);
  }

  doRegister() {
    if(!this._homeService.validateConfirmPassword(this.register.password, this.register.confirmPassword)) {
      this.passwordsConfirms = false;
    } else {
      this.passwordsConfirms = true;
      $('#modalAwareInfoNeed').modal();
    }
  }

  navigateToRegister() {
    this._homeService.navigateToRegister(this.register);
  }
}
