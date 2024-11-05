import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, collectionData, docData, setDoc, DocumentReference, DocumentData} from '@angular/fire/firestore';
import { ResultsWeights } from '../interfaces/results-weights';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeightsService {

  private apiUrl = 'https://api-bjbbbu645q-uc.a.run.app/api';

  



  constructor(
    private http : HttpClient,
  ) { }


  // Adds a new weight document
  addWeight(weightData: ResultsWeights): Observable<any> {
    return this.http.post(`${this.apiUrl}/addWeight`, weightData);
  }

  // Fetches all weight documents
  getWeights(): Observable<ResultsWeights[]> {
    return this.http.get<ResultsWeights[]>(`${this.apiUrl}/getWeights`);
  }

  // Fetches a specific weight document by ID
  getWeightById(id: string): Observable<ResultsWeights> {
    return this.http.get<ResultsWeights>(`${this.apiUrl}/getWeight/${id}`);
  }

  // Edits an existing weight document by ID
  editWeight(id: string, updatedData: ResultsWeights): Observable<any> {
    return this.http.put(`${this.apiUrl}/editWeight/${id}`, updatedData);
  }

  // Deletes a weight document by ID
  deleteWeight(id: string): Observable<any> {
    console.log(id)
    return this.http.delete(`${this.apiUrl}/deleteWeight/${id}`);
  }
}
