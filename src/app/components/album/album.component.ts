import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../../../Playlist';
import { SpotifyService } from 'src/app/services/spotify.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';
import { element } from 'protractor';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {

  hidden:boolean = false;
  id:string;
  album:any;
  playlist:string[] = [];


  constructor(private route:ActivatedRoute,
              private spotifyService:SpotifyService) { }


  ngOnInit() {
    this.route.params.pipe(map(params=>params['id']))
    .subscribe((id)=>{
      this.spotifyService.getAlbum(id)
      .subscribe(album=>{
        this.album= album;
      })
    })
  }
  addToPlaylist(str:string){
    this.playlist.push(str);   
    

  }
  
}
