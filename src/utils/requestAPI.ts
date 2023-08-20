import { CustomerUpdateAction } from '@commercetools/platform-sdk';
import {
  getCustomerID,
  deledeAddress,
  addCustomerAdress,
  customersIdPostExecute,
} from '../api/Client';
import { newAddress, count } from '../constants/registratForm';
import { IAddress } from '../interface/interface';

export const getCustomer = (customerID: string): void => {
  getCustomerID(customerID)
    .then(({ body }) => {
      count.version = body.version;
      count.ID = body.id;
      let addreses: IAddress[] = body.addresses as IAddress[];
      newAddress.splice(0);
      addreses.forEach((addres, i) => {
        if (i > 0) {
          newAddress.push(addres);
        }
      });
    })
    .catch(console.error);
};

export const deledeAddressID = (
  customerID: string,
  version: number,
  id: string,
  // create: () => void,
): void => {
  deledeAddress(customerID, version, id)
    .then(({ body }) => {
      count.version = body.version;
      getCustomer(customerID);
      // create();
    })
    .catch(console.error);
};

export const addAddressID = (
  customerID: string,
  version: number,
  newAddress1: {
    streetName: string;
    postalCode: string;
    city: string;
    country: string;
  },
  // create: () => void,addShippingAddressId
): void => {
  addCustomerAdress(customerID, version, newAddress1)
    .then(({ body }) => {
      count.version = body.version;
      getCustomer(customerID);
      // create();
    })
    .catch(console.error);
};

export const customerShippingBilling = (
  customerID: string,
  version: number,
  id: { idShipp: string; idBill: string },
  setShipping: number,
  setBilling: number,
): void => {
  let action: CustomerUpdateAction[] = setShipping
    ? setBilling
      ? [
          { action: 'addShippingAddressId', addressId: id.idShipp },
          { action: 'addBillingAddressId', addressId: id.idBill },
        ]
      : [{ action: 'addShippingAddressId', addressId: id.idShipp }]
    : setShipping === 2
    ? [
        { action: 'addShippingAddressId', addressId: id.idShipp },
        { action: 'addBillingAddressId', addressId: id.idShipp },
      ]
    : [{ action: 'addBillingAddressId', addressId: id.idBill }];

  customersIdPostExecute(customerID, version, action)
    .then(({ body }) => {
      count.version = body.version;
    })
    .catch(console.error);
};
