import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Album } from 'Models/Album';

@Component({
  selector: 'app-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.css']
})
export class SpotlightComponent implements OnInit {
  topTracks: Album[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.browseTopTracks()
    .subscribe(res=> {
    this.topTracks = res;
    });
  }

}
