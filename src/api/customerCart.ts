import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartAddLineItemAction,
  CartUpdateAction,
} from '@commercetools/platform-sdk';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';
import { apiRoot } from './Client';

export const shopList = (): ByProjectKeyShoppingListsRequestBuilder => {
  return apiRoot.shoppingLists();
};

export const cartID = (cartID: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: cartID }).get().execute();
};

export const cartAll = (): Promise<ClientResponse<CartPagedQueryResponse>> => {
  return apiRoot.carts().get().execute();
};

export const cartDraft = (): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();
};

export const cartDeleteID = (
  cartID: string,
  version: number,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: cartID })
    .delete({
      queryArgs: {
        key: 'bon47',
        version: version,
      },
    })
    .execute();
};

export const addProductCart = (
  cartID: string,
  version: number,
  productId: string,
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: cartID })
    .post({
      body: {
        version: version,
        actions: [
          {
            action: 'addLineItem',
            productId: productId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();
};

export const changeItemQuantity = (
  customerID: string,
  version: number,
  actions: CartUpdateAction[],
): Promise<ClientResponse<Cart>> => {
  return apiRoot
    .carts()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: actions,
        // [
        //   {
        //     action: 'changeLineItemQuantity',
        //     lineItemId: 'aa24f2e2-9a84-47bb-a1b0-3f1e88ce6df9',
        //     quantity: 10,
        //   },
        // ],
      },
    })
    .execute();
};
