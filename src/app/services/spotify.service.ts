import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {User} from '../../../../User';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  url:string = 'http://localhost:8082/users';
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
      'Bearer BQCUM2MJ8lw-gksNgbSWC7Oyw6aGrwBmZMxMK_1K9hAhDxhegpeZXiXU9kR6TstcQQnQg65mwahHcnOUmkVGb5YqfzugqXxZMtxqsPYDnLwP51hJ5hQDPlmkZLP0JmzQfM5wTAi1xs4d0Oc'
    });

    return this.http.get(url, { headers });
  }

  private searchUrl:string;
  private artistUrl:string;

  constructor(private http:HttpClient) { }


  searchMusic(str:string,type='artist'){
    return this.getQuery(`search?query=${str}&offset=0&limit=20&type=${type}&market=US`)
    .pipe(map(res=>res['artists'].items));
  }

  getArtist(id:string){
    return this.getQuery(`artists/${id}`)
    .pipe(map(res=>res));
  }

  getAlbums(id:string){
    return this.getQuery(`artists/${id}/albums`)
    .pipe(map(res=>res));
  }

  getAlbum(id:string){
    return this.getQuery(`albums/${id}`)
    .pipe(map(res=>res));
  }

  loginUser(user:User):Observable<User>{
      return this.http.post<User>(this.url,user)
  }

  createUser(user:User):Observable<User>{
    return this.http.post<User>(this.url,user)
}
}
