import { Component } from '@angular/core';
import { Pesadas } from '../../../shared/interfaces/pesadas';
import { WeightsService } from '../../../shared/services/weights.service';
import { ResultsWeights } from '../../../shared/interfaces/results-weights';
import { OrderListModule } from 'primeng/orderlist';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { error } from 'console';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-control-stock',
  standalone: true,
  imports: [ RouterLink, CommonModule, ButtonModule, ProgressBarModule],
  templateUrl: './control-stock.component.html',
  styleUrl: './control-stock.component.scss'
})
export class ControlStockComponent {

  weightList: ResultsWeights[] = [];
  loading: boolean = false;

  constructor(
    private weightServices: WeightsService,
  ){
    this.fetchWeights();
    
  }

  fetchWeights() {
    this.loading = true;
    this.weightServices.getWeights().subscribe({
      next:(data)=>{
        this.weightList = data;
        this.loading = false;
      },
      error: (err)=>{
        console.log(err)
        this.loading = false;
      }
    });
  }

  deleteWeight(id:string){
    console.log(id)
    this.loading = true;
    this.weightServices.deleteWeight(id).subscribe({
      next:(result)=>{
        console.log(result)
        this.weightList = this.weightList.filter(we=> we.id != id );
        this.loading = false;

      },
      error:(err)=>{
        console.log(err);
        this.loading = false;
      }
    })
  }


  

}
