import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {User} from '../../../../User';



@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
 
  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
      'Bearer BQC1IxpmFbkHf7C0Trzr3PLsjRqF_hHMhyEgjIVk3AsCxCAiqWvKBDdrhYn4L4pXUh6huUhRAXKrgWta4k_EpEWDyVmdxN84aUspuplidwWMaEDD-5XsCAwtvTFIAQLYAsJ-OstbllEcN_g'
    });

    return this.http.get(url, { headers });
  }



  constructor(private http:HttpClient) { }

  browseTopTracks(){
    return this.getQuery(`browse/new-releases?country=AD&offset=0&limit=12`)
    .pipe(map(res=>res['albums'].items));
  }

  searchMusic(str:string,type='artist'){
    return this.getQuery(`search?query=${str}&offset=0&limit=20&type=${type}&market=US`)
    .pipe(map(res=>res['artists'].items));
  }

  getArtist(id:string){
    return this.getQuery(`artists/${id}`)
    .pipe(map(res=>res));
  }

  getAlbums(id:string){
    return this.getQuery(`artists/${id}/albums?market=AD&limit=10`)
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

   deletePlaylist(playlistId:any,userId:any){
    let url:string = `http://localhost:8082/playlists/${playlistId}?userId=${userId}`;
    return this.http.delete(url,{observe: 'response'})  
   }

   deleteSong(songId:any,playlistId:any){
     let url:string = `http://localhost:8082/songs/${songId}?playlistId=${playlistId}`; 
     return this.http.delete(url,{observe:'response'})
   }

   

  
}
