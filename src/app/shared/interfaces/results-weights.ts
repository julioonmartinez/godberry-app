import { Customer } from "./customer";
import { Pesadas } from "./pesadas";

export interface ResultsWeights {

    id?:string,
    customer:Customer,
    totalBox:number,
    netWeight:number,
    tara:number,
    grossWeight:number,
    createdAt?:any,
    weights?:Pesadas[],
    

}
