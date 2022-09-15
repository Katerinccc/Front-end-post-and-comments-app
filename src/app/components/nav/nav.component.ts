import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostCommand } from 'src/app/models/post-command';
import {v4 as uuid4} from 'uuid';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private postService: PostService,
    private state: StateService
    ) { }

  currentState = this.state.appState$.getValue();

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

    let newUuid = uuid4();

    const newPost:PostCommand = {
      postId: newUuid,
      title: title.value,
      author: author.value
    }

    this.postService.addNewPost(newPost).subscribe();
    author.value = "";
    title.value = "";

  }

}
