import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'chord-footer',
    templateUrl: 'templates/footer.component.html',
    styleUrls:['css/footer.component.css']
})
export class FooterComponent {
    currentYear:number;

    constructor()
    {
        let today = new Date();
        this.currentYear = today.getFullYear();
        
    }
    
}