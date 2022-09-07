import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostCommand } from 'src/app/models/post-command';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  public addPostModal(): void {
    const container = document.getElementById('nav-container') as HTMLElement;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addPostModal');
    container.appendChild(button);
    button.click();
  }

  public addNewPost(): void{
    const closeButton = document.getElementById("add-post-form") as HTMLButtonElement;
    closeButton.click();

    const author = document.getElementById("author") as HTMLInputElement;
    const title = document.getElementById("title") as HTMLInputElement;

    const newPost:PostCommand = {
      postId: (Math.floor(Math.random()*9999)).toString(),
      title: title.value,
      author: author.value
    }

    this.postService.addNewPost(newPost).subscribe();
    author.value = "";
    title.value = "";

  }

}
