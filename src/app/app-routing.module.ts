import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {SearchComponent} from './components/search/search.component';
import {AboutComponent} from './components/about/about.component';
import {ArtistComponent} from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { UserhomeComponent } from './components/userhome/userhome.component';
import { LoginComponent } from './components/login/login.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [{
  path: "search",component: SearchComponent,canActivate:[LoginGuard]
},{
  path: "about", component: AboutComponent,canActivate:[LoginGuard]
},{
  path: "artist/:id", component: ArtistComponent,canActivate:[LoginGuard]
},{
  path: "album/:id", component: AlbumComponent,canActivate:[LoginGuard]
},{
  path: "profile", component: UserhomeComponent,canActivate:[LoginGuard]
},{
  path: "", component: LoginComponent
},{
  path: "create", component: CreateuserComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

