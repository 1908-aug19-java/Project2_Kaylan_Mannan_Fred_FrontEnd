import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../User';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  user:User;
  name:string;
  email:string;
  password:string;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  createUser(){
    this.user.name = this.name;
    console.log(this.name);
    this.user.email = this.email;
    this.user.password = this.password; 
    console.log(this.user);
    // this.spotifyService.createUser(this.user)
    // .subscribe(res => res);
}
}
