import { NewPostPage } from './../new-post/new-post';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login';
import { PagesPage } from '../pages/pages';
import { DashboardPage } from '../dashboard/dashboard';
import { SuggestionsPage } from '../suggestions/suggestions';
import { MediaPage } from '../media/media';
import { MyPostsPage } from '../my-posts/my-posts';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  isLoggedIn: boolean = false;
  user: any;
  homePage: any;

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public navParams: NavParams, public events: Events, public storage: Storage ) {
    
    this.homePage = HomePage;

    this.getUser();

    this.events.subscribe('user:loggedin', ( user ) => {
      this.isLoggedIn = true;
    });

    this.events.subscribe('user:loggedout', () => {
      this.isLoggedIn = false;
    });
  
  }

  getUser() {
    this.storage.get('currentUser').then( ( user ) => {
      if ( user != null ) {
        this.events.publish('user:loggedin', user );
      }
      return user;
    });

    return null;
  }

  logout() {
    this.storage.set( 'currentUser', null ).then( () => {
      this.isLoggedIn == false;
      this.events.publish( 'user:loggedout' );
    });
  }

  openPage( page ) {
    if ( page == 'home' ) {
      this.childNavCtrl.setRoot( HomePage );
    }
    else if ( page == 'dashboard' ) {
      this.childNavCtrl.setRoot( DashboardPage );
    }
    else if ( page == 'media' ) {
      this.childNavCtrl.setRoot( MediaPage );
    }
    else if ( page == 'posts' ) {
      this.childNavCtrl.setRoot( MyPostsPage );
    }
    else if( page == 'pages' ) {
      this.childNavCtrl.setRoot( PagesPage );
    }
    else if( page == 'suggestions' ) {
      this.childNavCtrl.setRoot( SuggestionsPage );
    }
    else if( page == 'login' ) {
      this.childNavCtrl.push( LoginPage );
    }
    else if( page == 'new' ) {
      this.childNavCtrl.setRoot( NewPostPage );
    }
    else {
      this.childNavCtrl.setRoot( HomePage );
    }
  }
}
