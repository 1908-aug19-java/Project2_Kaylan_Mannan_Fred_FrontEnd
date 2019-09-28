import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {User} from '../../../../User';
import { Playlist } from '../../../../Playlist';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
 
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
      'Bearer BQANjIaodiLaXy2Hcfpv7H0vV9q4rZnlBKL9QxdIoftUK0GMTuZ2s1lm33AQquqzCscX7CNYmrTR1cWirXdF4KKYD2bOp41CCqEju6oszMycDrAuCEhju6FxY8_KD604h0UsXg4DzEviOjk'
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

  loginUser(email:string,password:string):Observable<User>{
   let url:string = `http://localhost:8080/login?email=${email}&password=${password}`;
   
   return this.http.post<User>(url,User);
  }

  createUser(user:User):Observable<any>{
    let url:string = 'http://localhost:8080/users'; 
    return this.http.post(url,user,{observe: 'response'});

  }

  // createPlaylist(playlist:Playlist):Observable<Playlist>{
  //   let url:string = 
  // }

  getPlaylist(id:number):Observable<any>{
    let url:string = `http://localhost:8080/playlists/users/${id}`;
    return this.http.get(url,).pipe(map(res=>res));
  }
   getSongByPlaylistId(id:number):Observable<any>{
     let url:string = `http://localhost:8080/songs/playlists/${id}`;
     return this.http.get(url).pipe(map(res => res));
   }

  
}
