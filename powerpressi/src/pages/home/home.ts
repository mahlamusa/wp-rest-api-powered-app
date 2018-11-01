import { PostsProvider } from './../../providers/posts/posts';
import { Component } from '@angular/core';
import { NavController,   NavParams, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { SinglePostPage } from './../single-post/single-post';

import * as Enums from '../../enums/enums';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  posts: any;
  pages: any;
  suggestions: any;
  
  constructor( public navParams: NavParams, public navCtrl: NavController, public http: Http, public postsProvider: PostsProvider) {    
  }

  ionViewDidLoad() {
    this.loadPosts();
  }

  loadPosts() {
    
  }

  viewSinglePost(post) {
    this.navCtrl.push( SinglePostPage, {post: post} );
  }

}
