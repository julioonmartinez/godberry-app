import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TypeBox } from '../../../../shared/interfaces/type-cajas-pesadas';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TYPEBOX } from '../../../../shared/enums/typebox.enum';
import { ResultsWeights } from '../../../../shared/interfaces/results-weights';
import { Customer } from '../../../../shared/interfaces/customer';
import { CLIENTS } from '../../../../shared/enums/custom.enum';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TypeBoxList } from '../../../../shared/interfaces/type-box-list';

@Component({
  selector: 'app-dialog-save-result-weight',
  standalone: true,
  imports: [DialogModule, AutoCompleteModule, InputNumberModule, DialogModule, DropdownModule, CommonModule, ReactiveFormsModule, FormsModule, ButtonModule],
  templateUrl: './dialog-save-result-weight.component.html',
  styleUrl: './dialog-save-result-weight.component.scss'
})
export class DialogSaveResultWeightComponent {
  
  @Input() visible: boolean = false;
  boxList: TypeBox[] = TYPEBOX;
  idTypeBox: string = '01';
  nameCustomer: Customer | null =  null ;
  customers: Customer[] = CLIENTS;
  filteredCustomers: Customer[] = [];
  typeBoxList: TypeBoxList[] = [
  ];
  optionDrop: {boxID: string, amount:number}[]= [
    {boxID: this.boxList[0].id!, amount:0  }
  ]
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<{ nameCustomber:Customer, typeBoxList: TypeBoxList[] }>();
  resultWeight: ResultsWeights | null = null


  
  saveConfiguration() { 
    console.log(this.optionDrop)
    this.typeBoxList = [];
    this.optionDrop.forEach(option=>{
      const boxRef:TypeBoxList ={
        amount: option.amount,
        box: this.boxList.find(boxx=> boxx.id === option.boxID) ?? this.boxList[0],
        tara: option.amount * (this.boxList.find(boxx=> boxx.id === option.boxID)?.tara ?? 0)
      };
      this.typeBoxList.push(boxRef)
    });
   if(this.nameCustomer && this.typeBoxList.length > 0 ){
    this.save.emit({nameCustomber: this.nameCustomer, typeBoxList:this.typeBoxList })
    this.cancel();
  }else{
    console.log(this.nameCustomer)
   }
    
   
   }
   search(event: any) {
    let query = event.query.toLowerCase();
    this.filteredCustomers = 
    this.customers.filter(customer => customer.name.toLowerCase().includes(query) ); 
   }
   addBoxList(){
    this.optionDrop.unshift({boxID:this.boxList[0].id! , amount:0})
   }
    cancel() { 
    this.visibleChange.emit(false);
  }
}
