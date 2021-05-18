import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostServices } from '../posts.services';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService: PostServices) {}
  // posts = [
  //   { title: 'First Post ', content: 'This is the post content' },
  //   { title: 'Second Post ', content: 'This is the post content' },
  //   { title: 'Third Post ', content: 'This is the post content' },
  //   {title:'Four Post ', content:'This is the post content'},
  //   {title:'Five Post ', content:'This is the post content'}
  // ];
  posts: Post[] = [];
  private postsSubscription: Subscription;
  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }
  onDelete(post_id:String){
this.postsService.deletepost(post_id)
  }
  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }
}
