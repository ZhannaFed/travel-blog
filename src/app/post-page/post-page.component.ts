import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/posts.service';
import { Post } from '../shared/interfaces';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit{

  //post$!: Observable<Post>
  post$!: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ){}

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id']);
      }))
  }
}


