import { Pipe,PipeTransform } from "@angular/core";
import { Song } from "./song.model";

@Pipe({
    name: "searchsongs"
})
export class SearchPipe implements PipeTransform {

    transform(songs:Song[],args:string)
    {
        if(songs && args)
        {
            
                let returnList = songs.filter((song)=>{
                    
                    let regExp:RegExp = new RegExp(args.toLowerCase());

                    if(regExp.test(song.name.toLowerCase()))
                    {
                        
                        return true;

                    }else{
                        return false;
                    }
                });

                return returnList;

        }else{
            return songs;
        }
    }
}