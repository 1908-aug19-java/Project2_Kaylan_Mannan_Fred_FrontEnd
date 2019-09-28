import { Component, OnInit } from '@angular/core';
import {Artist} from '../../../../../Artist';
import {Album} from '../../../../../Album';
import { SpotifyService } from 'src/app/services/spotify.service';
import {ActivatedRoute} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  id:string;
  artist:any;
  albums:Album[];


  constructor(private route:ActivatedRoute,
              private spotifyService:SpotifyService) { }

  ngOnInit() {
    console.log(localStorage.getItem("token"));
      this.route.params.pipe(map(params=>params['id']))
      .subscribe((id)=>{
        this.spotifyService.getArtist(id)
        .subscribe(artist=>{
          this.artist=artist;
        })
        this.spotifyService.getAlbums(id)
        .subscribe(albums=>{
          this.albums=albums['items'];
        })
      })
  }
  clearToken(){
    localStorage.clear();
  }

}
