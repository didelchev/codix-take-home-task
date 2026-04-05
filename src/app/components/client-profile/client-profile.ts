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
}

  onSave(): void {
    console.log('Saved client:', this.client);
  }
}