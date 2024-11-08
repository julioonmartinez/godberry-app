import { Component, effect, EventEmitter, Input, Output, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  

  customers: Customer[] = CLIENTS;
  filteredCustomersSender: Customer[] = [];
  filteredCustomersAdress: Customer[] = [];

  myForm: FormGroup | null = null;

 

  products:Product[] = PRODUCTS;
  filteredCProducts: Product[] =[];

  
 
  constructor(
    private formBuilder: FormBuilder,
    private messageService : MessageService,
  ){
    this.buildForm();

    effect(()=>{
      if(this.editProduct){
        this.buildForm()
      }
    })
  
   
  }

  buildForm(){
    if(this.editProduct){
      this.myForm = this.formBuilder.group({
        product: [this.editProduct.product, Validators.required],
        amount: [this.editProduct.amount, Validators.required],
        clientAdress: [this.editProduct.clientAdress, Validators.required],
        clientSender: [this.editProduct.clientSender, Validators.required],
      })
    }else{
      this.myForm = this.formBuilder.group({
        product: ['', Validators.required],
        amount: ['', Validators.required],
        clientAdress: ['', Validators.required],
        clientSender: ['', Validators.required],
      })
    }
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


}
