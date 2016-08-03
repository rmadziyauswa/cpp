import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES,Route } from '@angular/router';
import { Song } from './song.model';
import { SearchPipe } from './search.pipe';
import { SongService } from './song-service.service';

@Component({
    moduleId: module.id,
    selector: 'chord-search-list',
    templateUrl: 'templates/search-list.component.html',
    styleUrls:['css/search-list.component.css'],
    providers:[SongService],
    directives:[ROUTER_DIRECTIVES],
    pipes:[SearchPipe]
})
export class SearchListComponent {
    songs:Song[];
    query:string;

    constructor(private songService:SongService)
    {
        this.songService.getAllSongs().then(result => this.songs = result).catch(err => console.log(err));

    }
    
    onDelete(songId:string)
    {
        
        this.songService.deleteSong(songId).then(result => {
            this.songs.forEach((song,index)=>{
                if(song._id===songId)
                {
                    this.songs.splice(index,1);
                }
            });
        }).catch(err => console.log(err));
    }

    clearQuery()
    {
        this.query = "";
    }
}