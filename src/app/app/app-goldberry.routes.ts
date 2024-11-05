import { Route } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { PesadasComponent } from "./pages/pesadas/pesadas.component";
import { ControlStockComponent } from "./pages/control-stock/control-stock.component";

export default [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'home', component:HomeComponent},
            { path:'pesadas', component:PesadasComponent },
            {path:'control-stock', component:ControlStockComponent},
            {path:'', redirectTo:'/app/home', pathMatch:'full'}
        ]
    },
    
] as Route[];