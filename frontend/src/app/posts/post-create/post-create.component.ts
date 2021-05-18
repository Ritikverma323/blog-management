import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServices } from '../posts.services';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postsService: PostServices) {}
  enteredValue: string = '';
  enteredTitle: string = '';
  enteredContent: string = '';
  newPost: string = '';
  //@Output() postCreated = new EventEmitter();
  OnAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return false;
    }
    const post = {
      title: postForm.value.title,
      content: postForm.value.content,
    };
    //this.postCreated.emit(post);
    this.postsService.addPost(postForm.value.title, postForm.value.content);
    postForm.resetForm();
  }
  ngOnInit(): void {}
}
