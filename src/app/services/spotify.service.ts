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
      'Bearer BQB2isg10Xnt1k2RAbgVHRX4jcN9v3cloYdkqrdFM-kvhFfvOoah29dxj0kA1GJBg5nldVMNCTswg0BGg3hFbW7BRxvBP1lO3fBwuFlYcyv5xRnOOKj1i_Fc8bCyRqfb6NXB2fU4tykQHbU'
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
   let url:string = `http://localhost:8082/login?email=${email}&password=${password}`;
   
   return this.http.post<User>(url,User);
  }

  createUser(user:User):Observable<any>{
    let url:string = 'http://localhost:8082/users'; 
    return this.http.post(url,user,{observe: 'response'});

  }

  createPlaylist(id:any,name:any):Observable<any>{
    let url:string = `http://localhost:8082/playlists?playlistName=${name}&userId=${id}`
    return this.http.post(url,{observe:'response'})
  }

  getPlaylist(id:number):Observable<any>{
    let url:string = `http://localhost:8082/users/${id}/playlists`;
    return this.http.get(url,).pipe(map(res=>res));
  }
   getSongByPlaylistId(id:any):Observable<any>{
     let url:string = `http://localhost:8082/songs/playlists/${id}`;
     return this.http.get(url).pipe(map(res => res));
   }
   convertSongId(id:any){
      return this.getQuery(`tracks/${id}`)
      .pipe(map(res=>res));
   }
   addToPlaylist(playlistId:any,songName:string,artistName:string,spotifySongId:any){
      let url:string = `http://localhost:8082/songs?playlistId=${playlistId}&songName=${songName}&artistName=${artistName}&spotifySongId=${spotifySongId}`;
      return this.http.post(url,{observe:'response'});
   }

   getUsers(userName:string){
     let url:string = `http://localhost:8082/usernames/${userName}`;
     return this.http.get(url);
   }

   

  
}
