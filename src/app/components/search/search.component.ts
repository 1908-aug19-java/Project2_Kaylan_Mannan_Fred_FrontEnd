import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../services/spotify.service';
import {Artist} from 'Models/Artist';
import { Album } from 'Models/Album';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchRes: Artist[] = [];
  topTracks: Album[] = [];

  constructor(private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.spotifyService.browseTopTracks()
    .subscribe(res=> {
      this.topTracks = res;
      console.log(res);
    });
  }

  searchMusic() {
    this.spotifyService.searchMusic(this.searchStr)
    .subscribe(res=> {
      this.searchRes = res;
    });
  }
  clearToken() {
    localStorage.clear();
  }
}
