import { SinglePostPage } from './../single-post/single-post';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

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
  status: any;

  //@ViewChild('content') childNavCtrl: NavController;

  constructor( public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {
    this.type = this.navParams.get( 'post_type' );
    console.log( this.getToken() );
  }
  
  submitPost() {
    //let token = this.getToken();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Basic ' + btoa( Enums.API.apiUsername + ':' + Enums.API.apiPassword )
      //'Authorization': 'Bearer ${token}'
    });

    let post = {
      title: this.title,
      type: this.type,
      excerpt: this.excerpt,
      content: this.content,
      status: this.status
    };

    let options = new RequestOptions({ headers: headers });

    this.http.post( Enums.API.apiUrl + 'posts', post, options)
    .map( response => response.json() )
    .subscribe( post => {
      console.log(post);

      this.navCtrl.push(SinglePostPage, {post:post});
    })
  }

  getToken() {
    this.storage.ready().then( () => {
      this.storage.get( 'currentUser' ).then( (user) => {
        return user.token
      } );
    });
  }

}
