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
  playlistId:number[] = [];
  name:string[] = [];




  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    
    this.spotifyService.getPlaylist(this.id)
    .subscribe(res => {res
      for(let i=0;i<res.length;i++){
          this.playlist.push(res[i].name); 
         this.playlistId.push(res[i].playlistId);        
          } 
          console.log(this.playlistId) 
          for(let x of this.playlistId){
            console.log(x);
          this.spotifyService.getSongByPlaylistId(x)
          .subscribe(res=>{res
           
            console.log(res);
        
              //this.playlistBody = res;
          })   
     // console.log(this.playlistId);
    //console.log(this.playlist);
          }
    })
  }
  clearToken(){
    localStorage.clear();
  }

  getSongs(){

  }
  





}
