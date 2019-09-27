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
      'Bearer BQBQ28SvCJ9k-uWwObvynOPF3bXoVfSzzF4bobC1szbS0NnEU7LhzC7i15a7nRb5CYomzAkjBRz15ESMjts1DeaTgaRN8etCu94bG8x-ZQqF-a90EzER5bolu7d52P2ipkEW1BKEa4rMqMI'
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

  
}
