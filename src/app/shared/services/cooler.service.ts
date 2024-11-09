import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pallets } from '../interfaces/pallets';

@Injectable({
  providedIn: 'root'
})
export class CoolerService {

  private apiUrl = 'https://api-bjbbbu645q-uc.a.run.app/api';

  

  constructor(
    private http : HttpClient,
  ) { }


  addPallet(pallet:Pallets):Observable<any> {
    pallet.date = new Date()
  return this.http.post(`${this.apiUrl}/addPallet`, pallet);
  }

  updatePallet(idPallet:string, palletUpdate:Pallets,):Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePallet/${idPallet}`, palletUpdate )
  }

  deletePallet(idPallet:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/deletePallet/${idPallet}`)
  }



 
  getPalletsInCooler(): Observable<Pallets[]> {
    return this.http.get<Pallets[]>(`${this.apiUrl}/getPallets`, {
      params: { status: 'Cooler' }
    });
  }
  
}
