import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post ={
    id: "",
    title: "",
    author: "",
    comments: []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
