import { Component,OnInit,OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,ROUTER_DIRECTIVES } from '@angular/router';
import { Song } from './song.model';
import { SongService } from './song-service.service';

@Component({
    moduleId: module.id,
    selector: 'view-song',
    templateUrl: 'templates/view-song.component.html',
    styleUrls:['css/view-song.component.css'],
    providers:[SongService],
    directives:[ROUTER_DIRECTIVES]
    
})
export class ViewSongComponent implements OnInit,OnDestroy {
    songId:string;
    subscription:any;
    song:Song;

    constructor(private route:ActivatedRoute,private songService:SongService,private router:Router)
    {

    }

    ngOnInit()
    {
        this.subscription = this.route.params.subscribe(params => {
            if(params['id'])
            {
                this.songId = params['id'];
                this.songService.getSong(this.songId).then(result => {
                    this.song = result;  
            });
                
            }
        });
    }

    ngOnDestroy()
    {
        this.subscription.unsubscribe;
    }

    onDelete(songId:string)
    {
        this.songService.deleteSong(songId).then(deletedSong => this.router.navigate(['/list']) ).catch(err => console.log(err));

    }
}