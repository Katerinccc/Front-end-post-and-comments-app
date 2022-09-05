import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { POST } from '../post-mock';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getAllPost(): Post[]{
    return POST;
  }

}
