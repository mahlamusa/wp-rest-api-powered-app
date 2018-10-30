import { PostsProvider } from './../../providers/posts/posts';
import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-media',
  templateUrl: 'media.html',
})
export class MediaPage {

  media: any = [];

  constructor( public navParams: NavParams, public postsProvider: PostsProvider) {
    
  }

  ionViewDidLoad() {
    this.media = this.postsProvider.load( "media" );
  }
}
