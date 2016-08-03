import { Injectable } from '@angular/core';
import { Http,Headers,Response } from "@angular/http";
import { Song } from './song.model';

import "rxjs/add/operator/toPromise";

@Injectable()
export class SongService {

    songs:Song[];
    localSongs:Song[]=[];
    songsUrl:string = "http://localhost:3000/api/songs";
    songUrl:string = "http://localhost:3000/api/song/";
    keys:string[] = ["A","Bb","B","C","C#","D","Eb","E","F","F#","G","Ab"];

    constructor(private http:Http) {      

        this.localSongs = JSON.parse(localStorage.getItem("Songs")) || [];
     }


    getAllKeys()
    {
        return this.keys;

    }

    getAllSongs()
    {
        if(navigator.onLine)
        {
            
            return this.http.get(this.songsUrl).toPromise().then(res => this.songs = res.json() as Song[]).catch(err => console.log(err));
        }else
        {
            let retPromise:Promise<Song[]> = new Promise<Song[]>((resolve,reject)=> { resolve(JSON.parse(localStorage.getItem("Songs"))) });

            

            return retPromise;          
            
        }

        
    }

    getSong(id:string)
    {
        if(navigator.onLine)
        {
            
            return this.http.get(this.songUrl + id).toPromise().then(res => res.json() as Song).catch(err => console.log(err));
        }else{
            //get in local storage
            let retPromise:Promise<Song> = new Promise<Song>((resolve,reject)=>{

                if(this.localSongs && this.localSongs.length>0)
                {
                    let retSong = this.localSongs.find(ls => ls._id == id);
                    
                    resolve(retSong);

                }else
                {
                    reject("NO Songs In Local Storage");
                }

            });
        }

    }


    
    deleteSong(id:string)
    {
        if(navigator.onLine)
        {
            
            return this.http.delete(this.songUrl + id).toPromise().then(res => res.json() as Song).catch(err => console.log(err));
        }else
        {
            let delSongID = this.localSongs.findIndex(ds => ds._id == id);
            this.localSongs.splice(delSongID,1);
            return new Promise<Song>((resolve,reject)=>{ resolve(this.localSongs[delSongID])});

        }

    }


    addSong(song:Song)
    {
        if(navigator.onLine)
        {

                
            let headers = new Headers();
            headers.append("Content-Type","application/json");
            
            return this.http.post(this.songUrl,JSON.stringify(song),{headers}).toPromise().then(result => result.json() as Song).catch(err=>console.log(err));
        
        }else{
            //get in local storage
            let retPromise:Promise<Song> = new Promise<Song>((resolve,reject)=>{

                if(this.localSongs && this.localSongs.length>0)
                {
                    this.localSongs.push(song);
                    localStorage.setItem("Songs",JSON.stringify(this.localSongs));
                    
                    resolve(song);

                }else
                {
                    reject("NO Songs In Local Storage");
                }

            });
        }
    }


    
    editSong(song:Song)
    {
        let headers = new Headers();
        headers.append("Content-Type","application/json");
        
        return this.http.post(this.songUrl + song._id,JSON.stringify(song),{headers}).toPromise().then(result => result.json() as Song).catch(err=>console.log(err));
    }

    syncSongs()
    {

        if(navigator.onLine)
        {

                
            this.getAllSongs().then(songs => {
                
                try {
                    
                        this.songs = this.compareAndUpdateSongs(this.localSongs,songs);

                } catch (error) {

                    console.log(error);

                }



            }).catch(err=> console.log(err));

            

        }
    }


    compareAndUpdateSongs(localSongs:Song[],onlineSongs:Song[]):Song[]
    {
        let returnList:Song[] = [];
        let onlineOnly:Song[] = [];


        if(localSongs && localSongs.length>0)
        {
            
            localSongs.forEach(song=>{
                
                if(!song._id) //if it dont have an id then its new and should be added online
                {
                    
                    this.addSong(song).then(retSong => song._id = retSong._id).catch(err=>console.log(err));
                }
                

            });




                    
                localSongs.forEach(song=>{

                    //check if song is in online db
                    let isInBoth = onlineSongs.some(onlineSong =>{ 
                        let b = onlineSong._id == song._id;

                        if(b)
                        {
                            //check for the latest modified one
                            if(onlineSong.dateModified > song.dateModified)
                            {
                                returnList.push(onlineSong);
                            }else{
                                //push the local song and also update it online
                                this.editSong(song).then(s=>returnList.push(s)).catch(err=>console.log(err));
                                

                            }

                            return b;
                        }
                    });

                    if(!isInBoth) //if song is in local db but not in online db
                    {
                        returnList.push(song);
                    }
                    
                });

                        

                    onlineSongs.forEach(s => {

                        if(localSongs.some(ls => ls._id == s._id))
                        {

                        }else{
                            onlineOnly.push(s);
                        }

                    });
               
                
                
            
        }else
        {                
            //else onlineOnly equals onlinesongs
            onlineOnly = onlineSongs;

        }

        
        //   console.log("ONLIne ONLY" , onlineOnly);
        //     console.log("LOCAL" , localSongs);
        //     console.log("ONLINE" , onlineSongs);

        if(onlineOnly && onlineOnly.length>0)
        {
                
            onlineOnly.forEach(s => returnList.push(s));

            

            //add the online only songs to the local storage as well
            onlineOnly.forEach(s => localSongs.push(s));

            
        }


        localStorage.setItem("Songs",JSON.stringify(localSongs));
        
        return returnList;
    }

}