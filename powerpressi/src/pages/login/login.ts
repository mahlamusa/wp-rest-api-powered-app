import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, Events, NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { UserProvider } from './../../providers/user/user';
import * as Enums from '../../enums/enums';
import { DashboardPage } from './../dashboard/dashboard';

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
  
  constructor(public navParams: NavParams,  public events: Events, public userProvider: UserProvider, public http: Http) {
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
  
  /**
   * This is NOT a real login.
   * PLEASE DO NOT INCLUDE THIS IN A REAL APP.
   * If you use this in production, your neighbor's dog will swallow your house with you inside.
   */
  login() {
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json');

    let userdata = {
      'search': this.username,
    }

    this.http.get( Enums.API.apiUrl + 'users', JSON.stringify( userdata ) )
    .map( response => response.json() )
    .subscribe( users => {
      let user = users[0];
      if( user.name == this.username || user.username == this.username || user.nickname == this.username ) {
        this.saveUser(user);
        this.isLoggedIn == true;

        this.events.publish('user:loggedin', user );

        this.childNavCtrl.setRoot(DashboardPage);
      }

      console.log(users[0]);
    }, (error) => {
      console.log(error);
    });
  }

}
