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
type ResultsWeightsWithLoading = ResultsWeights & {
  loading?: boolean;
};


@Component({
  selector: 'app-control-stock',
  standalone: true,
  imports: [CommonModule, RouterLink, CommonModule, ButtonModule, ProgressBarModule],
  templateUrl: './control-stock.component.html',
  styleUrl: './control-stock.component.scss'
})
export class ControlStockComponent {

  weightList: ResultsWeightsWithLoading[] = [];
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
        console.log(data)
      },
      error: (err)=>{
        
        this.loading = false;
      }
    });
  }

  deleteWeight(id:string){
    const weightRef = this.weightList.find(wei=> wei.id === id)
    if(weightRef){
      weightRef.loading = true;
    }
    this.weightServices.deleteWeight(id).subscribe({
      next:(result)=>{
       
        this.weightList = this.weightList.filter(we=> we.id != id );
        this.loading = false;

      },
      error:(err)=>{
        
        this.loading = false;
      }
    })
  }


  

}
