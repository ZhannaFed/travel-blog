import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FbCreateResponse, Post } from './interfaces';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  create(post: Post): Observable<Post>{
    return this.http.post<Post>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((res: any) => {
        const response = res as FbCreateResponse
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }

  getAll() {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))
      }))
  }
}
