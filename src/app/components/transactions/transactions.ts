import { Component, Input, OnChanges, OnInit, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NgClass } from '@angular/common';
import { CustomInitialsPipe } from '../../pipes/initials.pipe';
import { CustomCurrencyPipe } from '../../pipes/currency.pipe';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { FormsModule, NgModel } from "@angular/forms";

@Component({
  selector: 'app-transactions',
  imports: [NgClass, CustomInitialsPipe, CustomCurrencyPipe, CustomDatePipe, FormsModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchQuery = '';
  isReady = false;
  errorMessage = '';

  constructor(private transactionService: ClientService) {}


  filterTransactionsArray(): void {
     this.filteredTransactions = this.transactions.filter(transaction => { 
        return transaction.name.toLowerCase().includes(this.searchQuery) ||
               transaction.status.toLowerCase().includes(this.searchQuery)
     })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.transactionService.getTransactions().subscribe({
        next: (data) => {
          this.transactions = data;
          this.filteredTransactions = data;
          this.isReady = true;
        },
        error: (err) => {
          this.errorMessage = err;
          this.isReady = true;
        },
      });
    }, 1000);
  }
}
