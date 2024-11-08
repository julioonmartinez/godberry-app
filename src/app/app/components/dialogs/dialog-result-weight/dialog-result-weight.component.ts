import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ResultsWeights } from '../../../../shared/interfaces/results-weights';
import { CommonModule } from '@angular/common';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dialog-result-weight',
  standalone: true,
  imports: [DialogModule, ButtonModule,CommonModule ],
  templateUrl: './dialog-result-weight.component.html',
  styleUrl: './dialog-result-weight.component.scss'
})
export class DialogResultWeightComponent {
  @Input() visible: boolean = false;

  @Input() results: ResultsWeights | null = null;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<boolean>();


  saveConfiguration(){
    this.save.emit(true)
  }
  cancel(){
    this.visibleChange.emit(false)
  }
}
