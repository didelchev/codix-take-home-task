import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { CLIENT_FORM_CONFIG, FormFieldConfig } from '../../config/client-form.config';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client-profile.html',
  styleUrl: './client-profile.css'
})
export class ClientProfile implements OnInit {
  client: Client | null = null;
  isReady = false;
  showToast = false;
  errorMessage = '';

  personalFields: FormFieldConfig[] = [];
  addressFields: FormFieldConfig[] = [];
  bankingFields: FormFieldConfig[] = [];

  constructor(private clientService: ClientService) {
    this.personalFields = CLIENT_FORM_CONFIG.filter(field => field.section === 'personal');
    this.addressFields = CLIENT_FORM_CONFIG.filter(field => field.section === 'address');
    this.bankingFields = CLIENT_FORM_CONFIG.filter(field => field.section === 'banking');
  }


ngOnInit(): void {

  setTimeout(() => {
    const savedClient = localStorage.getItem('client');

    if(savedClient){
      this.client = JSON.parse(savedClient);
      this.isReady = true;
      return
    }

    this.clientService.getClient().subscribe({
      next: (data) => {
        this.client = data;
        this.isReady = true;
      },
      error: (err) => {
        this.errorMessage = err;
        this.isReady = true;
      }
    });
  }, 1000);
}

  onSave(): void {
    if(!this.client){
      return
    }
    localStorage.setItem('client', JSON.stringify(this.client));
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    },2000)

  }
}