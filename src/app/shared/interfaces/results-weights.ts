import { Customer } from "./customer";
import { Pesadas } from "./pesadas";
import { TypeBoxList } from "./type-box-list";
import { TypeBox } from "./type-cajas-pesadas";

export interface ResultsWeights {

    id?:string,
    customer:Customer,
    totalBox:number,
    grossWeight:number,
    tara:number,
    netWeight:number,
    createdAt?:any,
    weights?:Pesadas[],
    typeBox?:TypeBoxList[],
    numerWeights?: number[],
    

}
