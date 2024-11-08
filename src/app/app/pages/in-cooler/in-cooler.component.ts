import { Component, Signal, signal, ViewChild } from '@angular/core';
import { Product } from '../../../shared/interfaces/product';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NoListComponent } from '../../components/no-list/no-list.component';
import { DialogModule } from 'primeng/dialog';
import { DialogAddProductComponent } from "../../components/dialogs/dialog-add-product/dialog-add-product.component";
import { Pallets } from '../../../shared/interfaces/pallets';
import { ReceptionProduct } from '../../../shared/interfaces/reception-product';
import { ToastModule } from 'primeng/toast';
import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AssigmentPalletComponent } from "../../components/dialogs/assigment-pallet/assigment-pallet.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-in-cooler',
  standalone: true,
  imports: [CommonModule, AssigmentPalletComponent, OverlayPanelModule, MenuModule, ToastModule, DialogAddProductComponent, DialogModule, NoListComponent, ButtonModule, ProgressBarModule, ProgressSpinnerModule, DialogAddProductComponent, AssigmentPalletComponent],
  templateUrl: './in-cooler.component.html',
  styleUrl: './in-cooler.component.scss',
  providers:[MessageService]
})
export class InCoolerComponent {

  dialogAddProduct: boolean = false;
  dialogAssigmentPallet: boolean = false;

  currentPalletId: string | undefined;



 
  palletList:Pallets[] = []
  warningText:Signal<string> = signal('No hay pallets aún.')

  idAssigmentPallet: string | undefined = undefined;
  numerPalletAsigment = signal<number | undefined>(undefined);
  nameLocalStoragePalletItem: string = 'palletList';
  idCryptoPalletSelect: string | null = null;
  
  editProduct = signal<ReceptionProduct | undefined>(undefined);

  itemsMenuPallet: MenuItem[] = [
    {
      label:'Editar',
      items:[
        {label:'Asignar', icon: 'pi pi-pencil' , },
        {label:'Borrar', icon: 'pi pi-trash'},
        
      ]
    }
  ];

  

  constructor(
    private messageService : MessageService,

  ){
    this.getLocalStorage();
  }


  openDialogProduct(idCryptoPallet:string, editProduct?: ReceptionProduct){
   
    this.editProduct.set(editProduct);
    this.idCryptoPalletSelect = idCryptoPallet;
    this.dialogAddProduct = true;
    
  };
  closeDialogProduct(){
    this.dialogAddProduct = false;
    this.idCryptoPalletSelect = null;
    this.editProduct.set(undefined);
  }
  closeDialogAssimentPallet(){
    this.dialogAssigmentPallet = false;
    this.idAssigmentPallet = undefined;
    this.numerPalletAsigment.set(undefined);
  }

  assigmentPallet(idCryptoPallet:string, numberPallet: number | undefined){
    this.numerPalletAsigment.set(numberPallet);
    this.idAssigmentPallet = idCryptoPallet;
    this.dialogAssigmentPallet = true;
    
  }

  saveAssigmentPallet(event: number){
    console.log(event)
    if(this.idAssigmentPallet){
      const palletRef = this.palletList.find(pallet=> pallet.idCrypto == this.idAssigmentPallet);
      if(palletRef){
        palletRef.numberPallet = event
        this.savePalletLocalStorage();
      }else{
        this.messageError('Error Pallet', 'Parece hubo un error al encontrar la tarima')
      }
    }else{
      this.messageError('Error Pallet', 'No hay id asignado')
      
    }
  }

  

  quicklyAddNewPallet(){
    const newPallet: Pallets = {
      idCrypto: crypto.randomUUID(),
      createAt: new Date(),
    }
    this.palletList.push(newPallet);
    console.log(this.palletList)
    this.savePalletLocalStorage()
  }

  addProductOfPallet(receptionProduct: ReceptionProduct, idCryptoPallet: string) {
    const palletRef = this.palletList.find(pallet => pallet.idCrypto === idCryptoPallet);
    if (palletRef) {
        palletRef.receptionProducts = palletRef.receptionProducts ?? [];
        if (this.editProduct()) {
          const productIndex = palletRef.receptionProducts.findIndex(pro => pro.idCrypto === receptionProduct.idCrypto);

            if (productIndex !== -1) {
                palletRef.receptionProducts[productIndex] = receptionProduct;
            }
        } else {
          palletRef.receptionProducts.push(receptionProduct);
        }
    }

    this.closeDialogProduct();
    this.savePalletLocalStorage();
}
  getLocalStorage(){
    const pallets = localStorage.getItem(this.nameLocalStoragePalletItem);
    if(pallets){
      this.palletList = JSON.parse(pallets)
    }
  }
  savePalletLocalStorage(){
    localStorage.setItem(this.nameLocalStoragePalletItem, JSON.stringify(this.palletList) )
   }

   deleteProduct(idPallet:string, idProduct:string){
    const palletRef = this.palletList.find(pallet=> pallet.idCrypto == idPallet);

    if(palletRef){
      palletRef.receptionProducts = palletRef.receptionProducts?.filter(pro=> pro.idCrypto != idProduct)
      this.messageExit('Mensaje', 'Haz borrado una entrada')

    }else{
      this.messageError('Error', 'No se pudo borrar la entrada')
    }
   }

   deletePallet(idCryptoPallet:string){

    console.log(this.palletList)
    console.log(idCryptoPallet)
    this.palletList = this.palletList.filter(pallet=> pallet.idCrypto != idCryptoPallet);
    this.messageExit('Mensaje', 'Haz borrado una tarima');
    this.savePalletLocalStorage();
   }
   
   messageExit(summary:string, detail:string){
    this.messageService.add({
      severity: 'success',
      summary:summary,
      detail:detail,
    })
   }

   messageError(summary:string, detail:string){
    this.messageService.add({
      severity: 'Error',
      summary:summary ,
      detail:detail ,
    })
   }
}
