import { Customer } from "./customer";
import { Product } from "./product";

export interface ReceptionProduct {

    id?:string,
    idCrypto?:string,
    idPallet?:string,
    position?:number,
    date?:Date,
    clientSender:Customer;
    clientAdress:Customer;
    amount:number,
    product:Product,
    rancho?:string,
    numberPallet?:number,
    variedad?:string,
    calidad?:string,
    comments?:string
}
