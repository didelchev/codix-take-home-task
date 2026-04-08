import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { NgClass } from '@angular/common';
import { CustomInitialsPipe } from '../../pipes/initials.pipe';
import { CustomCurrencyPipe } from '../../pipes/currency.pipe';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { FormsModule, NgModel } from "@angular/forms";
import { TransactionModal } from '../transaction-modal/transaction-modal';
import { ChevronDown, ChevronUp, LucideAngularModule } from 'lucide-angular';
import { Transaction } from '../../models/transaction.model'

@Component({
  selector: 'app-transactions',
  imports: [NgClass, CustomInitialsPipe, CustomCurrencyPipe, CustomDatePipe, FormsModule, TransactionModal,LucideAngularModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})


export class Transactions implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedTransaction: Transaction | null = null;
  searchQuery = '';
  isModalOpen = false;
  isReady = false;
  errorMessage = '';

  readonly ArrowUp = ChevronUp
  readonly ArrowDown = ChevronDown

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

  
  openModal(transaction: Transaction): void { 
    if(!transaction){
      return
    }
    
    this.selectedTransaction = transaction;
    this.isModalOpen = true;
  }

  closeModal(): void{
    this.isModalOpen = true;
    this.selectedTransaction = null;

  }
}
