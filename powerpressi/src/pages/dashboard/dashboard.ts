import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostsProvider } from '../../providers/posts/posts';
import { NewPostPage } from '../new-post/new-post';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  posts: any;
  pages: any;
  suggestions: any;
  siteinfo: any;

  //@ViewChild('content') childNavCtrl: NavController;

  constructor( public navCtrl: NavController, public navParams: NavParams, public http: Http, public postsProvider: PostsProvider) {
    
  }

  ionViewDidLoad() {
    this.loadInformation();
    this.loadPosts();
    this.loadPages();
    this.loadSuggestions();
  }

  loadInformation() {
    
  }

  loadPosts() {
    
  }

  loadPages() {
    
  }

  loadSuggestions() {
    
  }

  newPost() {
    this.navCtrl.setRoot( NewPostPage, {post_type: 'post' } );
  }

  newSuggestion() {
    this.navCtrl.setRoot( NewPostPage, {post_type: 'suggestion' } );
  }
  newPage() {
    this.navCtrl.setRoot( NewPostPage, {post_type: 'page' } );
  }

}