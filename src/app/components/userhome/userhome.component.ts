import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import {UserPlaylist} from '../../../../../UserPlaylist';
import { Song } from '../../../../../Song';
import { Playlist } from '../../../../../Playlist';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
  userId:string = localStorage.getItem("token");
  id:number = parseInt(this.userId,10);
  playlistName:string;
  userPlaylist:UserPlaylist[] = [];
  playlists:Playlist[] = [];
  songs:Song[] = [];

  


  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
    console.log(this.id);
    this.spotifyService.getPlaylist(this.id)
    .subscribe(res=>{res
      console.log(res);
      this.userPlaylist = res;
      
      console.log(this.userPlaylist)
      //console.log(res.userId)
      // this.userPlaylist.userId = res.userId;
      // this.userPlaylist.playlists = res.playlists;
      //console.log(res.userId);
      //this.userPlaylist.userId = res.userId;
      //this.userPlaylist.playlists = res.playlists;
      // console.log(this.userPlaylist.userId);
      // console.log(this.userPlaylist.playlists[0].name);
        //this.userPlaylist.userId = res.
        //console.log(res.playlists);
    });
    // this.spotifyService.getPlaylist(this.id)
    // .subscribe(res => {res
    //   for(let i=0;i<res.length;i++){
    //      this.playlistId.push(res[i].playlistId);
    //      this.playlistName.push(res[i].name);
    //       }  
    // })
    // console.log(this.playlistId)
    // this.spotifyService.getSongByPlaylistId(this.songId)
    // .subscribe(res=>{res
    //   console.log(res);
    //   // this.songId.push(res.spotifySongId)
    //   // for(let i = 0;i<res.length;i++){
    //   //   this.songId.push(res[i].spotifySongId);
    //  // }
    // })  

  }
  clearToken(){
    localStorage.clear();
  }

  createPlaylist(){
    console.log(this.id,this.playlistName)
    this.spotifyService.createPlaylist(this.id,this.playlistName)
    .subscribe(res=>{res
      console.log(res)
        console.log(res.status);
    })
    location.reload();
  }

  





}
