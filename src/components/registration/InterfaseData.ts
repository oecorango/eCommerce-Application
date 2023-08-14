import { registerNewCustomer } from '../../api/Client';

export interface IOption {
  value: string;
  label: string;
}

export interface ICountriesData {
  name: string;
  postalCode: string;
  countriCode: string;
}

export interface IAddress {
  country: string;
  city: string;
  street: string;
  house: string;
}

export interface IRegistrationForm {
  email?: string;
  password?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | string;
  country: string;
  city: string;
  postalCode: string;
  streetName: string;
}

export const dataRegistrationForm: IRegistrationForm = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: '',
  city: '',
  postalCode: '',
  streetName: '',
};

export const newAddress = [
  {
    country: 'BY',
    city: 'Gomel',
    postalCode: '12345',
    streetName: 'Sovetskaya',
    streetNumber: '5',
  },
];

export const newCustomerData1 = {
  email: 'react@mail.ru',
  password: 'qwerty',
  firstName: 'ursa',
  lastName: 'goremskiy',
  dateOfBirth: '2000-10-12',
  addresses: newAddress,
};

export const countriesData: ICountriesData[] = [
  { name: 'Australia (AU)', postalCode: '9999', countriCode: '(AU)' },
  { name: 'Belarus (BY)', postalCode: '999999', countriCode: '(BY)' },
  { name: 'Brazil (BR)', postalCode: '99999-999', countriCode: '(BR)' },
  { name: 'Canada (CA)', postalCode: 'a9a', countriCode: '(CA)' },
  { name: 'Luxembourg (LU)', postalCode: 'L-9999', countriCode: '(LU)' },
  { name: 'Moldova (MD)', postalCode: 'MD-9999', countriCode: '(MD)' },
  { name: 'Poland (PL)', postalCode: '99-999', countriCode: '(PL)' },
  { name: 'Portugal (PT)', postalCode: '9999-999', countriCode: '(PT)' },
  {
    name: 'Russian Federation (RU)',
    postalCode: '999999',
    countriCode: '(RU)',
  },
  { name: 'Ukraine (UA)', postalCode: '99999', countriCode: '(UA)' },
  { name: 'United Kingdom (GB)', postalCode: 'aa99', countriCode: '(GB)' },
  { name: 'United States (US)', postalCode: '99999', countriCode: '(US)' },
];
