import { EditPage } from './../edit/edit';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, PopoverController, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { PopoverPage } from '../popover/popover';
import * as Enums from '../../enums/enums';

@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: 'my-posts.html',
})
export class MyPostsPage {

  posts: any;
  newPost:any;

  @ViewChild('content') childNavCtrl: NavController;
  
  constructor( public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController ) {
    
  }

  ionViewDidLoad() {
    this.loadPosts();
  }

  loadPosts() {
    
  }

  viewEditPost(post) {
    this.childNavCtrl.setRoot( EditPage, {post: post} );
  }

  presentPopover(event, post) {
    let popover = this.popoverCtrl.create(PopoverPage, {post:post});
    popover.present({
      ev: event
    });
  }

}
