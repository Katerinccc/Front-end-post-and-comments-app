import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postList: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
      this.postService.postCreated$
      .subscribe(_ => {this.getAllPost()});
  }

  public getAllPost(): void{
    this.postService.getAllPost()
      .subscribe(allPost => this.postList = allPost);
  }

}
