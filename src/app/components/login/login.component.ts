import { Component, OnInit } from '@angular/core';
import {User} from '../../../../../User';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit() {
  }

  loginUser(username:string,password:string){
        this.user.name = username;
        this.user.password = password; 

        this.spotifyService.loginUser(this.user)
        .subscribe(res => res);
  }
}
