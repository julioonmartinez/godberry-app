import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-assigment-pallet',
  standalone: true,
  imports: [ToastModule, DialogModule, ReactiveFormsModule, FormsModule, ButtonModule, InputNumberModule],
  templateUrl: './assigment-pallet.component.html',
  styleUrl: './assigment-pallet.component.scss',
  providers: [MessageService]
})
export class AssigmentPalletComponent {
  @Input() visible: boolean = false;
  @Input() numberPallet: number | undefined = undefined;

  myForm!: FormGroup;

  @Output() savePallet = new EventEmitter<number>();
  @Output() changeVisible = new EventEmitter<boolean>();

  constructor(
    private formBuild : FormBuilder,
    private meesageService : MessageService,

  ){
    this.buildForm();
  }

  buildForm(){
    this.myForm = this.formBuild.group({
      numberPallet: [this.numberPallet, Validators.required],
    })
  }

  save(){
    if(this.myForm.valid){
      const numberPallet = this.myForm.get('numberPallet')?.value;
      this.savePallet.emit(numberPallet);
      this.closeDialog()
    }else{
      this.meesageError('Error', 'Asigna un número de tarima')

    }

  }

  closeDialog(){
    this.visible = false;
    this.numberPallet = undefined;
    this.buildForm()
  }

  meesageError(summary:string, detail:string){
    this.meesageService.add({
      summary,
      detail,
      severity:'warn'
    })
  }
}
