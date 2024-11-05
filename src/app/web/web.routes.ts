import { Route } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";

export default [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'home', component:HomeComponent},
            {path:'', redirectTo:'/home', pathMatch:'full'}
        ]
    },
    
] as Route[];