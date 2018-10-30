import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Events, NavController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: string;
  user: any;
  isLoggedIn: boolean = false;

  @ViewChild('content') childNavCtrl: NavController;
  
  constructor(public navParams: NavParams,  public events: Events, public userProvider: UserProvider) {
    if ( this.getUser() != null ) {
      this.events.publish('user:loggedin', this.getUser() );
    }
  }

  saveUser( user ) {
    return this.userProvider.saveUser( user );
  }

  getUser() {
    return this.userProvider.getUser();
  }
  
  login() {
    this.userProvider.doLogin(this.username, this.password);
  }

}
