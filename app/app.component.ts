import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { SearchListComponent } from './search-list.component';

import { SongService } from './song-service.service';


@Component({
    selector: 'my-app',
    templateUrl: 'app/templates/app.component.html',
    styleUrls: ['app/css/app.component.css'],
    directives:[HeaderComponent,FooterComponent,SearchListComponent,ROUTER_DIRECTIVES],
    providers:[SongService]
})
export class AppComponent { 

    constructor(private songService:SongService){
        //synchronize the local db of songs with the online db
        songService.syncSongs();

    }
}