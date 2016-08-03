import { RouterConfig,provideRouter } from "@angular/router";
import { SearchListComponent } from "./search-list.component";
import { ViewSongComponent } from "./view-song.component";
import { EditSongComponent } from "./edit-song.component";

const routeConf:RouterConfig = [

    {
        path:"",
        redirectTo:"/list",
        pathMatch:"full"
    },
    {
        path:"list",
        component: SearchListComponent
    },
    {
        path:"song/:id",
        component: ViewSongComponent
    }
    ,
    {
        path:"edit/:id",
        component: EditSongComponent
    }
    ,
    {
        path:"edit",
        component: EditSongComponent
    }
];


export const appRouteProviders:any[] = [
    provideRouter(routeConf)
];