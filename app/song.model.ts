export class Song
{
    // public dateModified:Date;
    public isDeleted:Boolean;

    constructor(public _id:string,public name:string,public key:string,public progression:any[],public dateModified:Date)
    {
        
    }

}