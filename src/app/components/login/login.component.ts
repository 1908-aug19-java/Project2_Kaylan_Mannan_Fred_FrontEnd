import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  constructor(private spotifyService:SpotifyService,
              private router:Router) { }

  ngOnInit() {
    localStorage.clear();
    console.log(localStorage.getItem("token"));
  }

  loginUser(){
        this.email;
        this.password; 
        this.spotifyService.loginUser(this.email,this.password)  
        .subscribe(res =>{
            res;
            localStorage.setItem("token", JSON.stringify(res.userId));
            console.log(localStorage.getItem("token"));
            if(res!=null){  
              this.login();
            }else{
              location.reload;
            }
        });
  }
  login(){
        this.router.navigate(['/search']);  
  }
}
