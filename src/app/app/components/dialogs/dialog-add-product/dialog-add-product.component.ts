import { Component, effect, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { sign } from 'crypto';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CLIENTS } from '../../../../shared/enums/custom.enum';
import { Customer } from '../../../../shared/interfaces/customer';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { Product } from '../../../../shared/interfaces/product';
import { PRODUCTS } from '../../../../shared/enums/product-list.enum';
import { ReceptionProduct } from '../../../../shared/interfaces/reception-product';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-dialog-add-product',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, AutoCompleteModule, FormsModule, DialogModule, ButtonModule, InputTextModule, InputNumberModule],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss',
  providers:[MessageService]
})
export class DialogAddProductComponent {

  @Input() visible : boolean = false;
  @Input() editProduct : ReceptionProduct | undefined = undefined;
  @Output() changeVisible = new EventEmitter<boolean>();
  @Output() addProduct = new EventEmitter<ReceptionProduct>();

  otherSenderControl = new FormControl('');
  otherAddressControl = new FormControl('');
  

  customers: Customer[] = CLIENTS;
  filteredCustomersSender: Customer[] = [];
  filteredCustomersAdress: Customer[] = [];

  myForm: FormGroup | null = null;

 
  nameOtherClientAdress: string | undefined  = undefined; 
  nameOtherClienteSender: string | undefined = undefined;
  products:Product[] = PRODUCTS;
  filteredCProducts: Product[] =[];

  
 
  constructor(
    private formBuilder: FormBuilder,
    private messageService : MessageService,
  ){
    this.buildForm();

    this.otherSenderControl.valueChanges.subscribe(value => {
      const currentSender = this.myForm?.get('clientSender')?.value;
      if (currentSender?.id === '0') {
        this.myForm?.patchValue({
          clientSender: {
            ...currentSender,
            name: value
          }
        }, { emitEvent: false });
      }
    });

    this.otherAddressControl.valueChanges.subscribe(value => {
      const currentAddress = this.myForm?.get('clientAdress')?.value;
      if (currentAddress?.id === '0') {
        this.myForm?.patchValue({
          clientAdress: {
            ...currentAddress,
            name: value
          }
        }, { emitEvent: false });
      }
    });
    effect(()=>{
      if(this.editProduct){
        this.buildForm()
      }
    });

    
   
  }

  buildForm(){
    if(this.editProduct){
      this.myForm = this.formBuilder.group({
        product: [this.editProduct.product, Validators.required],
        amount: [this.editProduct.amount, Validators.required],
        clientAdress: [this.editProduct.clientAdress, Validators.required],
        clientSender: [this.editProduct.clientSender, Validators.required],
      });
      
     
      if (this.editProduct.clientSender.id === '0') {
        this.otherSenderControl.setValue(this.editProduct.clientSender.name);
      }
      if (this.editProduct.clientAdress.id === '0') {
        this.otherAddressControl.setValue(this.editProduct.clientAdress.name);
      }
    } else {
      this.myForm = this.formBuilder.group({
        product: ['', Validators.required],
        amount: ['', Validators.required],
        clientAdress: [null, Validators.required],
        clientSender: [null, Validators.required],
      });
    }
  }
  updateSenderName(event: any) {
    const value = event.target.value;
    const currentSender = this.myForm?.get('clientSender')?.value;
    this.myForm?.patchValue({
      clientSender: {
        ...currentSender,
        name: value
      }
    });
  }

  closeDialog() {
    this.editProduct = undefined;
    this.changeVisible.emit(false);
  };

  searchSender(event: any) {
    let query = event.query.toLowerCase();
    this.filteredCustomersSender = 
    this.customers.filter(customer => customer.name.toLowerCase().includes(query) ); 
   }
   searchAdress(event:any){
    let query = event.query.toLowerCase();
    this.filteredCustomersAdress = 
    this.customers.filter(customer => customer.name.toLowerCase().includes(query) ); 
   }

   searchProduct(event:any){
    let query = event.query.toLowerCase();
    this.filteredCProducts =
    this.products.filter(pro=> pro.genericName.toLocaleLowerCase().includes(query))
   
  }
  onAddProduct(){

    if(this.myForm && this.myForm.valid){
      if(this.editProduct){
        const receptionProduct: ReceptionProduct = {
          idCrypto: this.editProduct.idCrypto,
          ...this.myForm.value
        };
        // receptionProduct = this.changeNameOtherClient(receptionProduct)
        this.addProduct.emit(receptionProduct);
        this.buildForm();
        this.closeDialog();
        console.log(receptionProduct)

      }else{
        const receptionProduct: ReceptionProduct = {
          idCrypto: crypto.randomUUID(),
          ...this.myForm?.value,
        }
        this.addProduct.emit(receptionProduct);
        this.buildForm();
        this.closeDialog();
        console.log(receptionProduct)
      }

    }else{
      console.log('error')
      this.messageError('Error', 'Te falta un dato en el formulario, revisalo por favor.')

    }

   

  }

  messageError(summary:string, detail:string){
    this.messageService.add({severity:'warn', summary:summary, detail: detail})
  }

  changeNameOtherClient(receptionProduct: ReceptionProduct){
    if(receptionProduct.clientAdress.id === '0'){
      receptionProduct.clientAdress.name = this.nameOtherClientAdress ?? 'Sin nombre';
    }

    if(receptionProduct.clientSender.id === '0'){
      receptionProduct.clientSender.name = this.nameOtherClienteSender ?? 'Sin nombre';
    }
    return receptionProduct
  }


}
