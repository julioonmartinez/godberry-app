import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TypeBox } from '../../../shared/interfaces/type-cajas-pesadas';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Pesadas } from '../../../shared/interfaces/pesadas';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ResultsWeights } from '../../../shared/interfaces/results-weights';
import { WeightsService } from '../../../shared/services/weights.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogConfigWeightComponent } from '../../components/dialogs/dialog-config-weight/dialog-config-weight.component';
import { Customer } from '../../../shared/interfaces/customer';
import { CLIENTS } from '../../../shared/enums/custom.enum';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressBarModule } from 'primeng/progressbar';
import { TYPEBOX } from '../../../shared/enums/typebox.enum';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-pesadas',
  standalone: true,
  imports: [ProgressBarModule,  AutoCompleteModule, DialogConfigWeightComponent, InputTextModule, ToastModule, DropdownModule, InputTextModule, InputNumberModule, ButtonModule, DialogModule, CommonModule, TableModule, ReactiveFormsModule, FormsModule],
  templateUrl: './pesadas.component.html',
  styleUrl: './pesadas.component.scss',
  providers:[MessageService]
})
export class PesadasComponent {
  myForm!:FormGroup;

  dialogNameCustomer: boolean = false;
  
  visible: boolean = false;

  loading: boolean = false;

  dialogSaveResult: boolean = false;
  nameCustomer: Customer | null =  null ;

  boxList: TypeBox[]=  TYPEBOX;
  listOfWeighing:Pesadas[] = [];

  cols: Column[] = [
    {field:'position', header:'No.'},
    {field:'boxType', header:'Caja'},
    {field:'amountBox', header:'Cant'},
    {field:'grossWeight', header:'Bruto'},
    {field:'tara', header:'Tara'},
    {field:'netWeight', header:'Neto'},
    

  ];

  weightEdit: Pesadas | null = null;

  totalBox: number = this.listOfWeighing.length
  totalWeight: number = 0;

  weightResult: ResultsWeights = {
    customer: CLIENTS[0],
    totalBox:0,
    netWeight:0,
    tara: 0,
    grossWeight:0,
    typeBox:[],
  };

  customers: Customer[] = CLIENTS;
  filteredCustomers: Customer[] = [];

  selectedWeighing: any;

  typeBox: string = '01';
  amountRecurrent: number = 10;
  

  constructor(
    private formBuilder : FormBuilder,
    private weightService : WeightsService,
    private messageService : MessageService,
    private router : Router,
  ){
    this.buildForms()
    this.getListLocalStorage()
  }

  saveConfiguration(event:{idTypeBox:string, amountRecurrent:number}){
    this.typeBox = event.idTypeBox;
    this.amountRecurrent = event.amountRecurrent;
    this.buildForms();
    this.visible = false
  }

  search(event: any) {
     let query = event.query.toLowerCase();
     this.filteredCustomers = 
     this.customers.filter(customer => customer.name.toLowerCase().includes(query) ); 
    }

  onEditWeight(weight: Pesadas){
   
    this.weightEdit = weight
    this.buildFormEdit();
    // this.buildEdit2(weight)
  }

  buildFormEdit(){
    this.myForm = this.formBuilder.group({
      typeBox:[this.weightEdit?.boxType.id, Validators.required],
      amountBox:[this.weightEdit?.amountBox, Validators.required],
      pesokg:[this.weightEdit?.grossWeight, Validators.required]
    })

  }



  openMessageExit(message: string, title:string){
    console.log(message, title)
    this.messageService.add({severity:'success', summary:title, detail:message});
  }

  openMessageError(message: string, title:string){
    console.log(message, title)
    this.messageService.add({severity:'warn', summary:title, detail:message});
  }



  saveEdit(){

    if (this.myForm.valid) {
      let editRef = this.listOfWeighing.find(ref => ref.id === this.weightEdit?.id);
      if (editRef) {
          const boxType = this.boxList.find(box => box.id === this.myForm.get('typeBox')?.value) ?? this.boxList[0];
          const amountBox: number = Number(this.myForm.get('amountBox')?.value);
          const tara = boxType.tara * amountBox;
          const grossWeight = this.myForm.get('pesokg')?.value;
          const netWeight = grossWeight - tara;
  
          // Actualiza las propiedades del objeto existente
          editRef.position = this.weightEdit?.position; // Mantén la misma posición
          editRef.boxType = boxType;
          editRef.tara = tara;
          editRef.amountBox = amountBox;
          editRef.netWeight = netWeight;
          editRef.grossWeight = grossWeight;
  
          this.weightEdit = null;
          this.saveWeightLocalStoarge();
          this.buildForms();
      }
  }else{
    this.openMessageError('Te falta algun dato en el formulario', 'Error en formulario')
  }
  
    
  }

  calculateWeight(newWeight?: Pesadas){
    this.totalBox = this.listOfWeighing.reduce((acc, wei) => acc + Number(wei.amountBox), 0);
    this.totalWeight = this.listOfWeighing.reduce((acc, wei)=> wei.netWeight + acc, 0 );
    this.weightResult.totalBox = this.listOfWeighing.reduce((acc, wei) => acc + Number(wei.amountBox), 0);
    this.weightResult.grossWeight = this.listOfWeighing.reduce((acc, wei)=> wei.grossWeight + acc, 0 );
    this.weightResult.tara = this.listOfWeighing.reduce((acc, wei)=> wei.tara + acc, 0 );
    this.weightResult.netWeight = this.listOfWeighing.reduce((acc, wei)=> wei.netWeight + acc, 0 );
    // If a new weight is provided, update or add it in typeBox
    if(newWeight){
      const boxRer = this.weightResult.typeBox?.find(box=> box.box.id == newWeight.boxType.id);
      if(boxRer){
        console.log(newWeight.amountBox, boxRer.amount)
        boxRer.amount += newWeight.amountBox
      }else{
        this.weightResult.typeBox?.push({amount: newWeight.amountBox, box: newWeight.boxType, tara: newWeight.tara})
      }
      // If no new weight is provided, recalculate typeBox for the entire list
    }else{
      this.listOfWeighing.forEach(wei=> {
        const boxRer = this.weightResult.typeBox?.find(box=> box.box.id == wei.boxType.id);
        if(boxRer){
          console.log(wei.amountBox, boxRer.amount)
          boxRer.amount += wei.amountBox
        }else{
          console.log(wei.amountBox)
          this.weightResult.typeBox?.push({amount: wei.amountBox, box: wei.boxType, tara: wei.tara})
        }
      })
    }
    console.log(this.weightResult);
  }

  buildForms(){
    this.myForm = this.formBuilder.group({
      typeBox:[this.typeBox, Validators.required],
      amountBox:[this.amountRecurrent, Validators.required],
      pesokg:['', Validators.required]
    })
  }

  showDialog() {
    this.visible = true;
}

  getListLocalStorage(){
    const listaEnString = localStorage.getItem('weightList');
      if (listaEnString) {
        this.listOfWeighing = JSON.parse(listaEnString);
        console.log(this.listOfWeighing)
        this.calculateWeight();
      }else{
        this.showDialog();
      }
  }

  clearLocalSotarge(){
    localStorage.removeItem('weightList')
    this.listOfWeighing = []
  }
  openDialogSaveWeightList(){
    this.dialogNameCustomer = true;
  }

  addWeightsResult() { 
    this.loading = true;
    if(this.listOfWeighing.length > 0){
    if(this.nameCustomer != null){
      this.weightResult.customer = this.nameCustomer;
    }
       this.weightResult.weights = this.listOfWeighing
      this.weightService.addWeight(this.weightResult).subscribe({
        next:(response)=>{
          this.openMessageExit('Haz agregado exitosamente una resultado.', 'Pesada agregada')
          setTimeout(()=>{
            this.loading = false;
            this.clearLocalSotarge();
          this.router.navigateByUrl('/app')
          }, 500)
        },
        error:(err)=>{
          console.log(err)
          this.openMessageExit('Hubo un error, vuelve a intentarlo', 'Error')

        }
      })
    }else{
      this.loading = false
    }
    }

  addWeights(){
    if(this.myForm.valid){
      const id = crypto.randomUUID();
      const position = this.listOfWeighing.length + 1 ;
      const boxType = this.boxList.find(box=> box.id == this.myForm.get('typeBox')?.value ) ?? this.boxList[0]
      const amountBox: number = Number(this.myForm.get('amountBox')?.value);
      console.log(amountBox)
      const tara = boxType.tara * amountBox
      const grossWeight = this.myForm.get('pesokg')?.value;
      const netWeight =   grossWeight - tara;
      const weigh : Pesadas = {
        id:id,
        position: position,
        boxType:boxType,
        tara: tara,
        amountBox: amountBox,
        netWeight: netWeight,
        grossWeight: grossWeight
      }

    console.log(weigh)
    console.log()

    this.listOfWeighing = [...this.listOfWeighing, weigh]
    this.calculateWeight(weigh)
    
    this.buildForms();
    this.saveWeightLocalStoarge();
 
    }else{
      this.openMessageError('Te falta algun dato en el formulario', 'Error en formulario')
      console.log('n valid')
    }
  }

  createNameBox(box: TypeBox){
    return `${box.name}- ${box.tara} kg`

  }

  saveWeightLocalStoarge(){
    const listWeigth = JSON.stringify(this.listOfWeighing)
    localStorage.setItem('weightList', listWeigth )
    
  }

}
