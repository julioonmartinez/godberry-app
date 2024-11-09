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
import { CoolerService } from '../../../shared/services/cooler.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-in-cooler',
  standalone: true,
  imports: [ProgressBarModule, ProgressSpinnerModule, CommonModule, AssigmentPalletComponent, OverlayPanelModule, MenuModule, ToastModule, DialogAddProductComponent, DialogModule, NoListComponent, ButtonModule, ProgressBarModule, ProgressSpinnerModule, DialogAddProductComponent, AssigmentPalletComponent],
  templateUrl: './in-cooler.component.html',
  styleUrl: './in-cooler.component.scss',
  providers:[MessageService]
})
export class InCoolerComponent {
  loading: boolean = false;
  disabledButtons: boolean = false;

  dialogAddProduct: boolean = false;
  dialogAssigmentPallet: boolean = false;

  currentPalletId: string | undefined;
  deletePalletList:Pallets[] = []; 
  palletList:Pallets[] = []
  warningText:Signal<string> = signal('No hay pallets aún.')

  idAssigmentPallet: string | undefined = undefined;
  numerPalletAsigment = signal<number | undefined>(undefined);
  nameLocalStoragePalletItem: string = 'palletList';
  nameLocalStorageDeletePalletList: string = 'palletListDeleted'
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
    private coolerService : CoolerService,

  ){
    this.getPalletsDataBase();
    
  }

  getPalletsDataBase() {
    this.getLocalStorage();
    this.coolerService.getPalletsInCooler().subscribe({
      next: (data) => {
        console.log('data', data);
        data.forEach(pallet => {
          const index = this.palletList.findIndex(pll => pll.idCrypto === pallet.idCrypto);
          if (index !== -1) {
            this.palletList[index] = pallet;
          }
        });
        this.palletList.forEach(pallet=>{
          const index = data.findIndex(pll => pll.idCrypto === pallet.idCrypto);
          if(index !== -1){

          }else{
            pallet.sync = false;
            pallet.id = undefined;
            console.log(this.palletList)
          }
        })
        this.savePalletLocalStorage();
      },
      error: (err) => {
        console.log(err);
      }
    });
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

  asynPallets(){
    this.coolerService.getPalletsInCooler().subscribe({
      next:(data)=>{
        console.log('data', data)
        data.forEach(pallet=>{
          console.log(pallet)
          let palletRef = this.palletList.find(pll=> pll.idCrypto === pallet.idCrypto );
          if(palletRef){
            palletRef = pallet
          }else{
            this.palletList.push(pallet)
          }
          
        })

        console.log('list', this.palletList)
      },
      error:(err)=>{
        console.log(err)

      }
    })

    this.savePalletLocalStorage();
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
      status: 'Cooler',
      date: new Date(),
      sync: false,
    }
    this.palletList.unshift(newPallet);
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
    const palletsDeleted = localStorage.getItem(this.nameLocalStorageDeletePalletList);
    if(pallets){
      this.palletList = JSON.parse(pallets);
    }
    if(palletsDeleted){
      this.deletePalletList = JSON.parse(palletsDeleted);
      console.log(this.deletePalletList)
    }

    console.log(this.palletList)
  }
  savePalletLocalStorage(){
    localStorage.setItem(this.nameLocalStoragePalletItem, JSON.stringify(this.palletList) );
    localStorage.setItem(this.nameLocalStorageDeletePalletList, JSON.stringify(this.deletePalletList))
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

    const palletRef = this.palletList.find(pallet=> pallet.idCrypto == idCryptoPallet);
    if(palletRef){
      palletRef.sync = false;
     if(palletRef.id){
      this.deletePalletList.push(palletRef);
     }
      this.palletList = this.palletList.filter(pallet=> pallet.idCrypto != idCryptoPallet);
      this.messageExit('Mensaje', 'Haz borrado una tarima');
      this.savePalletLocalStorage();
    }
    
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


   async syncPallets() {
    this.loading = true;
    console.log(this.palletList);
  
    const updatePromises = this.palletList.map(async pallet => {
      if (pallet.id) {
        await lastValueFrom(this.coolerService.updatePallet(pallet.id, pallet));
        pallet.sync = true;
        return;
      } else {
        await lastValueFrom(this.coolerService.addPallet(pallet));
        pallet.sync = true;
        return;
      }
    });
  
    const deletePromises = this.deletePalletList.map(pallet => {
      if (pallet.id) {
        return lastValueFrom(this.coolerService.deletePallet(pallet.id))
          .then(() => this.deletePalletList = this.deletePalletList.filter(p => p.id !== pallet.id));
      }
      return;
    });
  
    try {
      await Promise.all([...updatePromises, ...deletePromises]);
      this.messageExit('Sincronización', 'Se han sincronizado los elementos');
    } catch (error) {
      // const palletWithError = this.palletList.find(p => p.numberPallet === error.pallet?.numberPallet) || this.deletePalletList.find(p => p.numberPallet === error.pallet?.numberPallet);
      // const message = `Error al sincronizar en la tarima: ${palletWithError?.numberPallet ?? palletWithError?.idCrypto}`;
      this.messageError('Sync', 'Error al sincroniza');
      console.error(error);
    } finally {
      this.loading = false;
      this.savePalletLocalStorage();
    }
  }


}
