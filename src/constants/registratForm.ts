import {
  ICountriesData,
  IRegistrationForm,
  IAddresses,
  IAddress,
  InewCustomerData,
} from '../interface/interface';

// export const dataRegistrationForm: IRegistrationForm = {
//   email: '',
//   password: '',
//   firstName: '',
//   lastName: '',
//   dateOfBirth: '',
//   country: '',
//   city: '',
//   postalCode: '',
//   streetName: '',
// };

export const count: { version: number; ID: string } = {
  version: 21,
  ID: '',
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
  { name: 'Belarus (BY)', postalCode: '999999', countriCode: '(BY)' },
  {
    name: 'Russian Federation (RU)',
    postalCode: '999999',
    countriCode: '(RU)',
  },
];
