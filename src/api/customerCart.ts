import {
  ClientResponse,
  Cart,
  CartPagedQueryResponse,
  CartAddLineItemAction,
  CartUpdateAction,
  ApiClient,
  ApiClientPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';
import { apiRoot, apiRootManage } from './Client';

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
      },
    })
    .execute();
};

export const createAPIClient = (
  name: string,
  id: string,
): Promise<ClientResponse<ApiClient>> => {
  return apiRootManage
    .apiClients()
    .post({
      body: {
        name: name,
        scope: `view_products:${process.env.REACT_APP_MANAGE_CTP_PROJECT_KEY}`,
        accessTokenValiditySeconds: 3600,
        refreshTokenValiditySeconds: 31536000,
      },
    })
    .execute();
};

export const getAPIClient = (): Promise<
  ClientResponse<ApiClientPagedQueryResponse>
> => {
  return apiRootManage.apiClients().get().execute();
};
