import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

import * as Enums from '../../enums/enums'

@IonicPage()
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html',
})
export class NewPostPage {
  type: any;
  title: any;
  excerpt: any;
  content: any;

  constructor( public navParams: NavParams, public http: Http) {
    this.type = this.navParams.get( 'post_type' );
  }
  
  submitPost() {
    
  }

}
