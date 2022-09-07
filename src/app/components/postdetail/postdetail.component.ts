import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post: Post = {
    id: "",
    title: "",
    author: "",
    comments: []
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const postId = Number(this.route.snapshot.paramMap.get('postId'));
    this.postService.getPost(postId)
      .subscribe(post => this.post = post);
  }

  addNewComment(){

  }

  goBack(): void {
    this.location.back();
  }

}
