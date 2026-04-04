export interface FormFieldConfig {
  key: string;
  label: string;
  type: string;
  readonly: boolean;
  section: 'personal' | 'address' | 'banking';
}

export const CLIENT_FORM_CONFIG: FormFieldConfig[] = [
  { key: 'name', label: 'First name', type: 'text', readonly: false, section: 'personal' },
  { key: 'secondName', label: 'Last name', type: 'text', readonly: false, section: 'personal' },
  { key: 'email', label: 'Email address', type: 'email', readonly: false, section: 'personal' },
  { key: 'phone', label: 'Phone number', type: 'tel', readonly: false, section: 'personal' },

  { key: 'address', label: 'Street address', type: 'text', readonly: false, section: 'address' },
  { key: 'city', label: 'City', type: 'text', readonly: false, section: 'address' },
  { key: 'country', label: 'Country', type: 'text', readonly: false, section: 'address' },

  { key: 'accountNumber', label: 'IBAN', type: 'text', readonly: true, section: 'banking' },
  { key: 'bankCard', label: 'Bank card', type: 'text', readonly: true, section: 'banking' },
];