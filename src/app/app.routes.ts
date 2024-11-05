import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadChildren:()=> import('./web/web.routes')
    },
    {
        path:'app', 
        loadChildren:()=> import('./app/app-goldberry.routes')}
];
