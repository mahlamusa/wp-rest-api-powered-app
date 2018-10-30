import { PostsProvider } from './../../providers/posts/posts';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  post: any;

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public navParams: NavParams, public postsProvider: PostsProvider ) {
    this.post = this.navParams.get( 'post' );
  }

  submitPost() {
    this.postsProvider.update( this.post, this.post.type + 's' );
  }

}
