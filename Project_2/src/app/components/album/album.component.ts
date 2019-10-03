import { Component, OnInit } from '@angular/core';
import {Playlist} from 'Models/Playlist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { Song } from 'Models/Song';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  hidden = false;
  id: string;
  album: any;
  playlists: Playlist[] = [];
  song: Song[] = [];
  userId: number = Number.parseInt(localStorage.getItem('token'),10);
  playlistId: any;

  constructor(private route: ActivatedRoute,
              private spotifyService: SpotifyService) { }


  ngOnInit() {
    this.route.params.pipe(map(params=>params['id']))
    .subscribe((id)=> {
      this.spotifyService.getAlbum(id)
      .subscribe(album=> {       
        this.album= album;
        this.song['artist'] = this.album.artists[0].name;
      });


      this.spotifyService.getPlaylist(this.userId)
      .subscribe(res=> {
      this.playlists = res.playlists;
      });
    });
  }

  clearToken() {
    localStorage.clear();
  }

  addToPlaylist(id: any,name: string) {
    this.spotifyService.addToPlaylist(this.playlistId,name,this.song['artist'],id)
    .subscribe(res=>res);
    location.reload();
  }
}
