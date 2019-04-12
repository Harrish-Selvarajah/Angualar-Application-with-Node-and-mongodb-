import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;


  constructor(public postService: PostsService) {

   }

  // posts = [
  //   {title: "First Post", content: "First post content" },
  //   {title: "Second Post", content: "Second post content" },
  //   {title: "third Post", content: "third post content" },
  // ]


  ngOnInit() {
  this.postService.getPosts();
// tslint:disable-next-line: no-trailing-whitespace
    this.postService.getPostUpdatedListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  onDelete(postId : string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }


}
