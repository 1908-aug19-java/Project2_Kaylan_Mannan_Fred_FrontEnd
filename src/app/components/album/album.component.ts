import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../../../Playlist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { Song } from '../../../../../Song';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  hidden:boolean = false;
  id:string;
  album:any;
 playlists:Playlist[] = [];
 song:Song[] = [];
  userId:number = Number.parseInt(localStorage.getItem("token"),10);
  playlistId:any;

  constructor(private route:ActivatedRoute,
              private spotifyService:SpotifyService) { }


  ngOnInit() {
    this.route.params.pipe(map(params=>params['id']))
    .subscribe((id)=>{
      this.spotifyService.getAlbum(id)
      .subscribe(album=>{       
        this.album= album;
        this.song['artist'] = this.album.artists[0].name;
        console.log(this.album)
      })


      this.spotifyService.getPlaylist(this.userId)
      .subscribe(res=>{res
        this.playlists = res.playlists
      })
    })
  }

  clearToken(){
    localStorage.clear();
  }

  addToPlaylist(id:any,name:string){
    console.log(this.song['artist']);
    this.spotifyService.addToPlaylist(this.playlistId,name,this.song['artist'],id)
    .subscribe(res=>{res
        console.log(res)
    })

      location.reload();
  }
}
