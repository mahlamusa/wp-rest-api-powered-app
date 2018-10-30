import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinglePostPage } from './single-post';

@NgModule({
  declarations: [
    SinglePostPage,
  ],
  imports: [
    IonicPageModule.forChild(SinglePostPage),
  ],
})
export class SinglePostPageModule {}
