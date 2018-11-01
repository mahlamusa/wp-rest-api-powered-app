import { Injectable, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events, NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import * as Enums from '../../enums/enums';

@Injectable()
export class UserProvider {

  username: any;
  password: any;
  isLoggedIn: boolean;

  @ViewChild('content') childNavCtrl: NavController;

  constructor( private storage: Storage, public http: Http, public events: Events) {
    
  }

  saveUser( user ) {
    this.storage.set('currentUser', user );
    return user;
  }

  getUser() {
    this.storage.get('currentUser').then( ( user ) => {
      return user;
    });

    return null;
  }

  userLoggedIn() {
    if (this.getUser() == null ) {
      return false;
    }

    return true;
  }

  /**
   * This is NOT a real login.
   * PLEASE DO NOT INCLUDE THIS IN A REAL APP.
   * If you use this in production, your neighbor's dog will swallow your house with you inside.
   */
  login(username, password) {
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

  doLogin(username, password) {
    let headers = new Headers();
    headers.append( 'Content-Type', 'application/json');
    let user = {
      username: username,
      password: password
    }

    this.http.post( Enums.API.apiAuthUrl, user )
    .map( response => response.json() )
    .subscribe( user => {
      this.saveUser(user);
      console.log(user);
      this.isLoggedIn == true;

        this.events.publish('user:loggedin', user );

        this.childNavCtrl.setRoot(DashboardPage);
    }, (error) => {
      console.log(error);
    });
  }

}
