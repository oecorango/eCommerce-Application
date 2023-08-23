import {
  ClientResponse,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';

export const logOut = (): void => {
  localStorage.removeItem('id');
  localStorage.removeItem('auth');
  localStorage.removeItem('name');
};

export const logIn = (data: ClientResponse<CustomerSignInResult>): void => {
  const userId = data.body.customer.id;
  const userName = data.body.customer.firstName;
  localStorage.setItem('id', userId);
  if (userName) localStorage.setItem('name', userName);
  localStorage.setItem('auth', 'true');
};
