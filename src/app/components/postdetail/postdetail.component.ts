import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostDetailComponent implements OnInit {

  @Input() post: Post ={
    postId: "",
    title: "",
    author: "",
    comments: []
  };

  constructor() { }

  ngOnInit(): void {
  }

}
