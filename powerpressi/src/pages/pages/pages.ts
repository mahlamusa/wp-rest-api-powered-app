import { PopoverPage } from './../popover/popover';
import { Http } from '@angular/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, PopoverController, Events, NavController } from 'ionic-angular';

import { PostsProvider } from './../../providers/posts/posts';

@IonicPage()
@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html',
})
export class PagesPage {

  pages: any = [];

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public navParams: NavParams, public http: Http, public popoverCtrl: PopoverController, public postsProvider: PostsProvider, public events: Events) {
    
  }

  ionViewDidLoad() {
    this.loadPages();
  }

  loadPages() {
    
  }

  viewPage(post) {
    this.postsProvider.viewPost( post );
  }

  newPage( ) {
    this.postsProvider.newPost( 'page' );
  }

  showContextMenu( event, post ) {
    let popover = this.popoverCtrl.create(PopoverPage, {post:post});
    popover.present({
      ev: event
    });
  }
}
