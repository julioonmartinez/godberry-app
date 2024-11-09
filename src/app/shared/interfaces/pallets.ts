import { ReceptionProduct } from "./reception-product"
import { Product } from "./product"
import { Timestamp } from "rxjs"

export interface Pallets {
    id?:string,
    idCrypto?:string,
    idViaje?:string,
    noViaje?:number,
    status?: 'Cooler' | 'Ship' | 'delivered' ,
    receptionProducts?:ReceptionProduct[],
    numberPallet?:number,
    totalBox?:number,
    totalMaterial?: number
    date?:Date,
    // createAt:Timestamp,
    // updatedAt:Timestamp,
    sync:boolean,
}
