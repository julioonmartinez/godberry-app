import { ReceptionProduct } from "./reception-product"
import { Product } from "./product"

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
    createAt:Date,
}
