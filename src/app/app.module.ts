import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgForOf } from '@angular/common';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { PostsComponent } from './components/posts/posts.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
{ path: 'users' , component: UserComponent },
{ path: 'posts' , component: PostsComponent },
{ path: '', redirectTo: '/posts', pathMatch: 'full'},
{ path: '**', redirectTo: '/posts', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    PostsComponent
  ],
  imports: [
      BrowserModule,

      RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
),    FormsModule,
      HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
