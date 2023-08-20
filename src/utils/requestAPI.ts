import {
  getCustomerID,
  deledeAddress,
  addCustomerAdress,
  addShippingAddressId,
  addBillingAddressId,
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

export const addShippingAddress = (
  customerID: string,
  version: number,
  id: string,
  swith: boolean,
): void => {
  addShippingAddressId(customerID, version, id)
    .then(({ body }) => {
      count.version = body.version;
      if (swith) {
        let id = body.addresses[1].id as string;
        addBillingAddress(body.id, body.version, id);
      }
    })
    .catch(console.error);
};

export const addBillingAddress = (
  customerID: string,
  version: number,
  id: string,
): void => {
  addBillingAddressId(customerID, version, id)
    .then(({ body }) => {
      count.version = body.version;
    })
    .catch(console.error);
};
