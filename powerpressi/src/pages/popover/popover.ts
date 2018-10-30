import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { EditPage } from '../edit/edit';

import { PostsProvider } from './../../providers/posts/posts';
import { SinglePostPage } from '../../pages/single-post/single-post';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  //@ViewChild('content') childNavCtrl: NavController;
  
  post: any;

  constructor( public navParams: NavParams, public navCtrl: NavController, public postsProvider: PostsProvider){
     
  }

  ionViewDidLoad() {
    this.post = this.navParams.get( 'post' );
  }

  editPost(post) {
    this.navCtrl.push( EditPage, {post: post} );
  }

  deletePost( post ) {
    this.postsProvider.delete( post, post.type );
  }

  viewPost( post ) {
    this.navCtrl.push(SinglePostPage, {post: post} );
  }

}
