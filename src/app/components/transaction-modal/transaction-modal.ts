import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomCurrencyPipe } from '../../pipes/currency.pipe';
import { CustomDatePipe } from '../../pipes/date.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-modal',
  imports: [CustomCurrencyPipe, CustomDatePipe, NgClass],
  templateUrl: './transaction-modal.html',
  styleUrl: './transaction-modal.css',
})
export class TransactionModal {
  @Input() transaction: Transaction | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void { 
    this.close.emit();
  }
}
