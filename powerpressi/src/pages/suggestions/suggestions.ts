import { PostsProvider } from './../../providers/posts/posts';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, PopoverController, NavController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

@IonicPage()
@Component({
  selector: 'page-suggestions',
  templateUrl: 'suggestions.html',
})
export class SuggestionsPage {

  suggestions: any;

  @ViewChild('content') childNavCtrl: NavController;
  
  constructor( public navParams: NavParams, public postsProvider: PostsProvider, public popoverCtrl: PopoverController) {
    this.loadSuggestions();
  }

  ionViewDidLoad() {
    
  }

  loadSuggestions() {
    this.suggestions = this.postsProvider.load('suggestions')
  }

  viewSuggestion(post) {
    this.postsProvider.viewPost( post );
  }

  newSuggestion( ) {
    this.postsProvider.newPost( 'suggestion' );
  }

  showContextMenu( event, post ) {
    let popover = this.popoverCtrl.create(PopoverPage, {post:post});
    popover.present({
      ev: event
    });
  }

}
