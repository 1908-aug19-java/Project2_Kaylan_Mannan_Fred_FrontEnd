import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import {SearchUser} from '../../../../../SearchUser';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.css']
})
export class SharingComponent implements OnInit {
  searchUsr:string;
  user:SearchUser[] = [];
  

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  searchUsers(){
    this.spotifyService.getUsers(this.searchUsr)
    .subscribe(res=>{res
     console.log(res);
    })

}

}
