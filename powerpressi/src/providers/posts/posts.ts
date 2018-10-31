import { Injectable, ViewChild } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';

import * as Enums from '../../enums/enums';

import { NewPostPage } from './../../pages/new-post/new-post';

@Injectable()
export class PostsProvider {

  posts: any = null;

  @ViewChild('content') childNavCtrl: NavController;

  constructor( public http: Http, public popoverCtrl: PopoverController, public storage: Storage ) {
    
  }

  /**
   * Request posts from the API given the post type and some optional arguments
   * 
   * @param objectsType Plural post type to be loaded. Eg. 'posts'
   * @param args Optional arguments to filter posts by
   * @return array posts
   */
  load( objectsType, args = null ) {

    // http://example.com/wp-json/wp/v2/<objectsType>
    let url = Enums.API.apiUrl + objectsType; 
    if ( args != null ) {
      url = url + '?' + JSON.stringify( args );
      // http://example.com/wp-json/wp/v2/<objectsType>?key=value&key2=value2
    }

    return this.http.get( url );
    //.map( response => response.json())
    //.subscribe(posts => {
    //  return posts;

    //}, (error) => {
    //  return null;
    //  console.log(error);
    //});
  }

  /**
   * 
   * @param post An array of post parameters as expected by the API
   * @param objectsType The post type of the post to be added. Defaults to 'posts'
   */
  add( post, objectsType = 'posts') {

    let token = this.getToken();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Basic ' + btoa( Enums.API.apiUsername + ':' + Enums.API.apiPassword )
      'Authorization': 'Bearer ${token}'
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post( Enums.API.apiUrl + objectsType, JSON.stringify(post), options); // https://domain.com/wp-json/wp-v2/posts
    //.map( response => response.json() )
    //.subscribe( post => {
    //  return post;
    //} );
  }

  /**
   * Updated a post using the the given data.
   * 
   * @param post Post data to be updated
   * @param objectsType The plural post type to be updated
   */
  update( post, objectsType = 'posts') {
    let token = this.getToken();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Basic ' + btoa( Enums.API.apiUsername + ':' + Enums.API.apiPassword )
      'Authorization': 'Bearer ${token}'
    });

    let options = new RequestOptions({ headers: headers });

    this.http.post( Enums.API.apiUrl + objectsType, JSON.stringify(post), options)
    .map( response => response.json() )
    .subscribe( post => {
      return post;
    }, (error) => {
      console.log(error);
    });
  }  

  /**
   * Delete the given post
   * 
   * @param post the post to be deleted
   * @param postType the type of the post to be deleted
   */
  delete( post, postType ) {
    let token = this.getToken();

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      //'Authorization': 'Basic ' + btoa( Enums.API.apiUsername + ':' + Enums.API.apiPassword )
      'Authorization': 'Bearer ${token}'
    });

    let options = new RequestOptions({ headers: headers });

    // https://domain.com/wp-json/wp-v2/posts/id
    this.http.delete( Enums.API.apiUrl + postType + 's/' + post.id, options)
    .map( response => response.json() )
    .subscribe( post => {
      return post;
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * Load page to add new post
   * 
   * @param postType The type of post too be created
   */
  newPost( postType ) {
    this.childNavCtrl.setRoot( NewPostPage, {post_type: postType } );
  }

  viewPost( post ) {
    //this.childNavCtrl.setRoot(SinglePostPage, {post: post} );
  }

  getToken() {
    this.storage.ready().then( () => {
      this.storage.get( 'currentUser' ).then( (user) => {
        return user.token
      } );
    });
  }

}
