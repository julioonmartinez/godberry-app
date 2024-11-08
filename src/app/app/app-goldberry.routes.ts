import { Route } from "@angular/router";
import { LayoutComponent } from "./components/layout/layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { PesadasComponent } from "./pages/pesadas/pesadas.component";
import { ControlStockComponent } from "./pages/control-stock/control-stock.component";
import { FastWeightComponent } from "./pages/fast-weight/fast-weight.component";
import { InCoolerComponent } from "./pages/in-cooler/in-cooler.component";

export default [
    {
        path:'',
        component:LayoutComponent,
        children:[
            {path:'home', component:HomeComponent},
            { path:'pesadas', component:PesadasComponent },
            {path:'control-stock', component:ControlStockComponent},
            {path:'fast-weight', component:FastWeightComponent},
            {path:'in-cooler', component:InCoolerComponent},
            {path:'', redirectTo:'/app/home', pathMatch:'full'}
        ]
    },
    
] as Route[];