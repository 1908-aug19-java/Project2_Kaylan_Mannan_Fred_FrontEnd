import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../../../Playlist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {Song} from '../../../../../Song';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  userId:string = localStorage.getItem("token");
  id:number = parseInt(this.userId,10);
  playlist:Playlist[] = [];
  songId:Song[] = [];


  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    console.log(localStorage.getItem("token"));
    this.spotifyService.getPlaylist(this.id)
    .subscribe(res => {res
      console.log(res);
      for(let i=0;i<res.length;i++){
          this.playlist.push(res[i].name);
          console.log(res[i].playlistId)
          this.spotifyService.getSongByPlaylist(res[i].playlistId)
          .subscribe(songs=>{
            songs
            console.log(songs);
            for(let i =0;i<songs.length;i++){
              console.log(songs[i].spotifySongId)
            }
            
          })
           

          }
      
     // console.log(this.playlistId);
    //console.log(this.playlist);
    })
  }
  clearToken(){
    localStorage.clear();
  }




}
