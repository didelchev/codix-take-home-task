import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NgClass } from '@angular/common';
import { CustomInitialsPipe } from '../../pipes/initials.pipe';
import { CustomCurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-transactions',
  imports: [NgClass, CustomInitialsPipe, CustomCurrencyPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit{

  transactions: Transaction[]  | null = [];
  isReady = false;
  errorMessage = ''

  constructor(private transactionService: ClientService){}

  ngOnInit(): void {
    setTimeout(() => {
      this.transactionService.getTransactions().subscribe({
        next: ( data) => {
          this.transactions = data;
          this.isReady = true;

        },
        error: (err) => {
          this.errorMessage = err;
          this.isReady = true
        }
      })
    }, 1000)
  }


}
