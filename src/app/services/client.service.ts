import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client.model';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private CLIENT_URL = 'assets/client.json';
  private TRANSACTIONS_URL = 'assets/client.json'

  constructor(private http: HttpClient){};

  getClient(): Observable<Client>{
    return this.http.get<Client>(this.CLIENT_URL).pipe(
      catchError(() => throwError(() => "Failed to load client data !"))
    )
  }


  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.TRANSACTIONS_URL).pipe(
      catchError(() => throwError(() => "Failed to load transactions data !"))
    )
  }
}
