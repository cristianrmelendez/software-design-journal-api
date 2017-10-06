import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts:Post[];
  constructor() { }

  ngOnInit() {

  this.posts = [{username: "carlos" ,
            date: "8 de mayo",
            body: "Soy un pendejo"},
            {username: "Jose" ,
            date: "8 de mayo",
            body: "Soy un cabron"}

  ];



  }

}

interface Post{
username:string,
date: string,
body: string
}
