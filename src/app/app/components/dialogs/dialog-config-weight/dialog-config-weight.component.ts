import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TypeBox } from '../../../../shared/interfaces/type-cajas-pesadas';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-dialog-config-weight',
  standalone: true,
  imports: [InputNumberModule, DialogModule, DropdownModule, CommonModule, ReactiveFormsModule, FormsModule, ButtonModule],
  templateUrl: './dialog-config-weight.component.html',
  styleUrl: './dialog-config-weight.component.scss'
})
export class DialogConfigWeightComponent {

  @Input() visible: boolean = false;
  @Input() boxList: TypeBox[] = [];
  @Input() idTypeBox: string = '01';
  @Input() amountRecurrent: number = 10;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<{ idTypeBox: string, amountRecurrent: number }>();

  
  saveConfiguration() { 
    this.save.emit({ idTypeBox: this.idTypeBox, amountRecurrent: this.amountRecurrent }); 
    this.visibleChange.emit(false);
   }
  cancel() { this.visibleChange.emit(false);}

}
