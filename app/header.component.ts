import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'chord-header',
    templateUrl: 'templates/header.component.html',
    styleUrls:['css/header.component.css'],
    directives:[ROUTER_DIRECTIVES]
})
export class HeaderComponent {
    
}