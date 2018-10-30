import { PostsProvider } from './../../providers/posts/posts';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-single-post',
  templateUrl: 'single-post.html',
})
export class SinglePostPage {

  post: any;
  
  @ViewChild('content') childNavCtrl: NavController;

  constructor(  public navParams: NavParams, public postsProvider: PostsProvider) {
    this.post = this.navParams.get('post');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglePostPage');
  }

  thumbsUp(post) {
    post.thumbs_up = 1;
    this.postsProvider.update( post, 'post' );
  }

  thumbsDown(post) {
    post.thumbs_down = 1;
    this.postsProvider.update( post, 'post' );
  }

}
