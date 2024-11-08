export interface Product {
    id:string,
    genericName:string,
    type: 'fruta' | 'Material' | 'otro' | 'botes' ,
    presentacion:string,
    priceFlete?: number,
}
