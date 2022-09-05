import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postList: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  public getAllPost(): void{
    this.postList = this.postService.getAllPost();
  }

}
