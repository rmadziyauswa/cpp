import { Component,OnInit,OnDestroy } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute } from '@angular/router';
import { Song } from './song.model';
import { SongService } from './song-service.service';

@Component({
    moduleId: module.id,
    selector: 'view-song',
    templateUrl: 'templates/edit-song.component.html',
    styleUrls:['css/edit-song.component.css'],
    providers:[SongService]
    
})
export class EditSongComponent {
    songId:string;
    song:Song;
    sub:any;
    _progression:string;
    keys:string[];

    constructor(private route:ActivatedRoute,private songService:SongService,private router:Router)
    {

    }

    ngOnInit()
    {
        this.keys = this.songService.getAllKeys();
        this.song = new Song("0","","",[],new Date());

        this.sub = this.route.params.subscribe(params =>{
            if(params['id'])
            {
                this.songId = params['id'];
                this.songService.getSong(this.songId).then(song=>{
                    this.song=song;
                    this._progression = song.progression.toString();

                }).catch(err=>console.log(err));

            }
        });
    }

    ngOnDestroy()
    {
        this.sub.unsubscribe;
    }


    onSubmit(songForm:any)
    {
        
            this.song.progression = this._progression.split(",");

        if(this.songId)
        {
            //its an edit
            
            this.songService.editSong(this.song).then(res=> this.router.navigate(['/list'])).catch(err=>console.log(err));

        }else{
            //its a new song       

            this.songService.addSong(this.song).then(res=> this.router.navigate(['/song',res._id])).catch(err=>console.log(err));

        }
    }

}