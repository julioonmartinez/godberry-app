import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogSaveResultWeightComponent } from "../../components/dialogs/dialog-save-result-weight/dialog-save-result-weight.component";
import { Customer } from '../../../shared/interfaces/customer';
import { TypeBoxList } from '../../../shared/interfaces/type-box-list';
import { ResultsWeights } from '../../../shared/interfaces/results-weights';
import { DialogResultWeightComponent } from "../../components/dialogs/dialog-result-weight/dialog-result-weight.component";
import { WeightsService } from '../../../shared/services/weights.service';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-fast-weight',
  standalone: true,
  imports: [ProgressSpinnerModule, ProgressBarModule, ToastModule, DialogResultWeightComponent, DialogSaveResultWeightComponent, DialogModule, AutoCompleteModule, ButtonModule, CommonModule, DialogSaveResultWeightComponent, DialogResultWeightComponent],
  templateUrl: './fast-weight.component.html',
  styleUrl: './fast-weight.component.scss',
  providers:[MessageService,]
})
export class FastWeightComponent {

  visibleDialogSaveResult: boolean = false;
  loadingSave: boolean = false;
  visible: boolean = false;
  currentInput: string = ''; 
  total: number = 0; 
  operator: string | null = null;
  listWeight: number[] = []; 
  resultWeigth: ResultsWeights | null = null;
  nameLocalStorageListWeight: string = 'listWeights';
  loading: boolean = false;

  constructor(
    private weightService : WeightsService,
    private router: Router,
    private messageService: MessageService
  ){
    this.getLocalStorage()
  }
  /**
   * Handles the input of numbers and operators.
   * If an operator is passed, it triggers the applyOperator method.
   * Otherwise, it appends the digit to the current input string.
   * @param value - The button value that was pressed (either a number or an operator)
   */
  input(value: string) {
    if (['+', '-', '*', '/'].includes(value)) {
      this.applyOperator(value);
    } else {
      this.currentInput += value; // Concatenates the number to form the full input value
    }
  }

  openDialogSaveResult(){
    this.visibleDialogSaveResult = true; 
  }
  openBoxList(){
    this.visible = true
  }

  openMessageExit(summary:string, message:string){
    this.messageService.add(
      {
        severity: 'success',
        summary:summary,
        detail:message,
      }
    )
  }

  openMessageError(summary:string, message:string){
    this.messageService.add(
      {
        severity: 'error',
        summary:summary,
        detail:message,
      }
    )
  }


  saveResult(event:boolean){
   this.loadingSave = true;
    this.visibleDialogSaveResult = false;
    if(event && this.resultWeigth){
      this.weightService.addWeight(this.resultWeigth).subscribe({
        next:(result)=>{
          console.log(result)
          this.clearLocalStorage();
          this.router.navigateByUrl('/app')
        },
        error:(err)=>{
          this.loading = false;
          this.openMessageError('Error', 'Algo salio mal al guardar, vuelve a intentarlo')
        }
      })
    }else{
      this.openMessageError('Error', 'Algo salio mal al guardar, vuelve a intentarlo')      
    }
  }



  cancelSaveResult(){
    this.visibleDialogSaveResult = false;

  }
  cancelBoxList(){
    this.visible = false;
  }

  /**
   * Applies the selected operator.
   * If there is a current input, calculates the current total and pushes it to the list.
   * Sets the operator for the next calculation.
   * @param operator - The mathematical operator ('+', '-', '*', '/')
   */
  applyOperator(operator: string) {
    if (this.currentInput !== '') {
      this.total = this.calculateTotal(); // Calculates current total based on the last operator
      this.listWeight.unshift(Number(this.currentInput)); // Adds the calculated total to the weight list
      this.saveLocalStorage();
      this.currentInput = ''; // Resets the current input
    }
    this.operator = operator; // Updates the operator for the next calculation
    console.log(this.currentInput)
  }

  /**
   * Executes the calculation when the '=' button is pressed.
   * Computes the final result and pushes it to the list to display.
   */
  calculate() {
    if (this.currentInput !== '') {
      this.total = this.calculateTotal(); // Performs the final calculation
      this.listWeight.push(this.total); // Displays the final result in the list
      this.currentInput = ''; // Clears the input for a new calculation
      this.operator = null; // Resets the operator
    }
  }

  /**
   * Calculates the total based on the current operator.
   * If no operator is selected, it returns the current input as a number.
   * @returns The calculated total as a number.
   */
  private calculateTotal(): number {
    const inputAsNumber = parseFloat(this.currentInput); // Converts current input to a number
    switch (this.operator) {
      case '+':
        return this.total + inputAsNumber;
      case '-':
        return this.total - inputAsNumber;
      case '*':
        return this.total * inputAsNumber;
      case '/':
        return this.total / inputAsNumber;
      default:
        return inputAsNumber; // If no operator, returns the current input
    }
  }

  /**
   * Resets the calculator to its initial state.
   * Clears the current input, total, operator, and the list of weights.
   */
  clear() {
    this.currentInput = ''; 
    this.total = 0; 
    this.operator = null; 
    this.listWeight = [];
    this.clearLocalStorage();

  }

  saveConfiguration(event:{nameCustomber:Customer, typeBoxList: TypeBoxList[]}){
    console.log(event.typeBoxList)
    const totalBox = event.typeBoxList.reduce((acc, curren)=> acc + curren.amount, 0)
    const grossWeight = this.total;
    const tara = event.typeBoxList.reduce((acc, curren)=> acc + curren.tara, 0);
    const netWeight = grossWeight - tara;
    const typeBoxList = event.typeBoxList;

    
    this.resultWeigth = {
      customer: event.nameCustomber,
      totalBox: totalBox,
      grossWeight: grossWeight,
      tara: tara,
      netWeight: netWeight,
      typeBox: typeBoxList,
      numerWeights: this.listWeight,
    }
    console.log(this.resultWeigth)
  }

  clearLocalStorage(){
    localStorage.removeItem(this.nameLocalStorageListWeight)
  }


  getLocalStorage(){
    this.loading = true;
    const list = localStorage.getItem(this.nameLocalStorageListWeight)

    if(list){
      this.listWeight = JSON.parse(list)
      this.total = this.listWeight.reduce((acc, curr)=> acc + curr, 0);
      this.loading = false;
    }else{
      this.loading = false
    }
  }
  saveLocalStorage(){
    localStorage.setItem(this.nameLocalStorageListWeight, JSON.stringify(this.listWeight) )
  }
}
