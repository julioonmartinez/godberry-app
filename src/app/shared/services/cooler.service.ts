import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pallets } from '../interfaces/pallets';

@Injectable({
  providedIn: 'root'
})
export class CoolerService {

  private apiUrl = ''

  

  constructor(
    private http : HttpClient,
  ) { }


  addPallet(pallet:Pallets):Observable<any> {
    pallet.createAt = new Date()
  return this.http.post(`${this.apiUrl}`, pallet);
  }
}
