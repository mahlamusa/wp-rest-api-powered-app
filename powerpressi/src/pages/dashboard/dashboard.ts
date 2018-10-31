import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostsProvider } from '../../providers/posts/posts';

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

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public navParams: NavParams, public http: Http, public postsProvider: PostsProvider) {
    
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
    this.postsProvider.newPost( 'post' );
  }

  newSuggestion() {
    this.postsProvider.newPost( 'suggestion' );
  }

  newPage() {
    this.postsProvider.newPost( 'page' );
  }

}