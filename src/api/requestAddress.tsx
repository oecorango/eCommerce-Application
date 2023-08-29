import { count } from '../constants/registratForm';
import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import { getCustomerID, customersIdPostExecute, newPassword } from './Client';
import { updateUserData } from '../components/Forms/utils/updateUserData';

let action: CustomerUpdateAction[] = [];

export const getCustomer01 = (customerID: string): void => {
  getCustomerID(customerID)
    .then(({ body }) => {
      updateUserData(body);
    })
    .catch(console.error);
};

const requestStart = (
  action: CustomerUpdateAction[],
  back: () => void,
): void => {
  customersIdPostExecute(count.ID, count.version, action)
    .then(({ body }) => {
      updateUserData(body);
      back();
    })
    .catch(console.error);
};

export const setDefault = (defoltShip: string, defoltBill: string): void => {
  let action: CustomerUpdateAction[] = [];
  if (defoltShip.length > 0 || defoltBill.length > 0) {
    if (defoltShip.length > 0) {
      action.push({
        action: 'setDefaultShippingAddress',
        addressId: defoltShip,
      });
    }
    if (defoltBill.length > 0) {
      action.push({
        action: 'setDefaultBillingAddress',
        addressId: defoltBill,
      });
    }
    const callback = (): void => {};
    requestStart(action, callback);
  }
};

export const editAddressID = (
  newAddress: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  },
  id: string,
  toForm: () => void,
): void => {
  if (id) {
    action = [{ action: 'changeAddress', addressId: id, address: newAddress }];
  } else {
    action = [{ action: 'addAddress', address: newAddress }];
  }
  const callback = (): void => {
    toForm();
  };
  requestStart(action, callback);
};

export const editUserData = (
  UserData: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  },
  toForm: () => void,
): void => {
  action = [
    { action: 'changeEmail', email: UserData.email },
    { action: 'setFirstName', firstName: UserData.firstName },
    { action: 'setLastName', lastName: UserData.lastName },
    { action: 'setDateOfBirth', dateOfBirth: UserData.dateOfBirth },
  ];
  const callback = (): void => {
    toForm();
  };
  requestStart(action, callback);
};

export const newUserPassword = (
  asswordOld: string,
  asswordNew: string,
  toForm: (errorMessage: string) => void,
): void => {
  let errorMessage = '';
  newPassword(count.ID, count.version, asswordOld, asswordNew)
    .then(({ body }) => {
      updateUserData(body);
    })
    .catch(error => {
      console.warn(error);
      if (error.code === 400) {
        errorMessage = 'ERROR: Incorrect password';
      } else {
        errorMessage = 'ERROR, Should try again later';
      }
    })
    .finally(() => {
      toForm(errorMessage);
    });
};

export const deledeAddressID = (id: string, toForm: () => void): void => {
  action = [{ action: 'removeAddress', addressId: id }];
  const callback = (): void => {
    toForm();
  };
  requestStart(action, callback);
};

export const customerShippingBilling = (
  customerID: string,
  version: number,
  id: { idShipp: string; idBill: string },
  setBillShipp: boolean[],
): void => {
  let action: CustomerUpdateAction[] = [];
  if (setBillShipp.includes(true)) {
    if (setBillShipp[0]) {
      action.push({ action: 'addShippingAddressId', addressId: id.idShipp });
    }
    if (setBillShipp[1]) {
      action.push({ action: 'addBillingAddressId', addressId: id.idShipp });
    }
    if (setBillShipp[2]) {
      action.push({ action: 'addBillingAddressId', addressId: id.idBill });
    }
  }

  if (setBillShipp.includes(true)) {
    customersIdPostExecute(customerID, version, action)
      .then(({ body }) => {
        updateUserData(body);
      })
      .catch(console.error);
  }
};
