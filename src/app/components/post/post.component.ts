import { Component, OnInit, Input } from '@angular/core';
import { PostResponse } from 'src/app/models/post-response';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: PostResponse ={
    id: "",
    postId: "",
    title: "",
    author: "",
    comments: []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
