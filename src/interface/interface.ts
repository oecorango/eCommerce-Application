export interface SignInForm {
  email: string;
  password: string;
}

export interface ICountriesData {
  name: string;
  postalCode: string;
  countriCode: string;
}

// export interface IRegistrationForm01 {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   country: string;
//   city: string;
//   postalCode?: string;
//   streetName: string;
// }

export interface IAddresses {
  country: string;
  city: string;
  postalCode?: string;
  streetName: string;
}

export interface IAddress {
  country: string;
  city: string;
  id: string;
  postalCode: string;
  streetName: string;
}

export interface IRegistrationForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: IAddresses[];
}
