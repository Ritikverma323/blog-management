import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PostServices {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private httpClient: HttpClient) {}
  getPosts() {
    //return [...this.posts];
    this.httpClient
      .get<{ message: string; posts: any }>('http://localhost:3000/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              content: post.content,
            };
          });
        })
      )
      .subscribe((transformpost) => {
        this.posts = transformpost;
        this.postsUpdated.next([...this.posts]);
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
  deletepost(postid: String) {
    this.httpClient
      .delete('http://localhost:3000/delete-posts/' + postid)
      .subscribe(() => {
        const updateposts = this.posts.filter((post) => {
          return post._id !== postid;
        });
        this.posts = updateposts;
        this.postsUpdated.next([...this.posts]);
        console.log('Delete the Post');
      });
  }
  addPost(title: string, content: string) {
    const post: Post = { _id: null, title: title, content: content };
    this.httpClient
      .post<{ message: string }>('http://localhost:3000/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
