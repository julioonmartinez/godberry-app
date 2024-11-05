import { TypeBox } from "./type-cajas-pesadas";

export interface Pesadas {
    id?:string,
    position?:number,
    boxType:TypeBox,
    tara:number,
    amountBox:number,
    netWeight:number,
    grossWeight:number,
}
