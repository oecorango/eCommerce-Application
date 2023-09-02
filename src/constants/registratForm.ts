import {
  ICountriesData,
  IAddresses,
  IAddress,
  InewCustomerData,
  IUserData,
} from '../types/interface';

export const count: {
  version: number;
  ID: string;
  defaultShipping: string;
  defaultBilling: string;
  versionCart: number;
} = {
  version: 1,
  ID: '',
  defaultShipping: '',
  defaultBilling: '',
  versionCart: 1,
};

export let newAddress: IAddresses[] = [
  {
    country: '',
    city: '',
    postalCode: '',
    streetName: '',
  },
];

export let newAddres: IAddress[] = [
  {
    country: '',
    city: '',
    id: '',
    postalCode: '',
    streetName: '',
  },
];

export const newCustomerData: InewCustomerData = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: newAddress,
};

export const countriesData: ICountriesData[] = [
  { name: 'Belarus (BY)', countryCode: 'BY' },
  { name: 'Russian Federation (RU)', countryCode: 'RU' },
];

export let userData: IUserData = {
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
};
