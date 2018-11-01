import { PostsProvider } from './../../providers/posts/posts';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  media: any = [];

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public navParams: NavParams, public postsProvider: PostsProvider) {
    
  }

  ionViewDidLoad() {
    
  }
}
