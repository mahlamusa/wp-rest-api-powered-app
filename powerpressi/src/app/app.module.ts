import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PostsProvider } from '../providers/posts/posts';
import { UserProvider } from '../providers/user/user';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MyPostsPage } from '../pages/my-posts/my-posts';
import { NewPostPage } from '../pages/new-post/new-post';
import { EditPage } from '../pages/edit/edit';
import { LoginPage } from './../pages/login/login';
import { PopoverPage } from './../pages/popover/popover';
import { PagesPage } from './../pages/pages/pages';
import { MediaPage } from './../pages/media/media';
import { SuggestionsPage } from './../pages/suggestions/suggestions';
import { SinglePostPage } from './../pages/single-post/single-post';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    DashboardPage,
    MyPostsPage,
    NewPostPage,
    SuggestionsPage,
    MediaPage,
    PagesPage,
    PopoverPage,
    LoginPage, 
    EditPage,
    SinglePostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    DashboardPage,
    MyPostsPage,
    NewPostPage,
    SinglePostPage,
    SuggestionsPage,
    MediaPage,
    PagesPage,
    PopoverPage,
    LoginPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    PostsProvider,
    UserProvider
  ]
})
export class AppModule {}
