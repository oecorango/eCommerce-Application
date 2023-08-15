export interface SignInForm {
  email: string;
  password: string;
}

export interface ICountriesData {
  name: string;
  postalCode: string;
  countriCode: string;
}

export interface IRegistrationForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date | string;
  country: string;
  city: string;
  postalCode?: string;
  streetName: string;
}
