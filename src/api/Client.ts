import { ctpClient } from './BuildClient';
import {
  Cart,
  CartAddLineItemAction,
  CartPagedQueryResponse,
  CartUpdateAction,
  CategoryPagedQueryResponse,
  ClientResponse,
  createApiBuilderFromCtpClient,
  Customer,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
  CustomerUpdateAction,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';
import { ByProjectKeyShoppingListsRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/shopping-lists/by-project-key-shopping-lists-request-builder';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'bon747jour',
});

export const getClients = (): Promise<Object> => {
  return apiRoot.get().execute();
};

export const clientSignIn = (
  data: CustomerSignin,
): ApiRequest<CustomerSignInResult> => {
  return apiRoot.login().post({ body: data });
};

export const getCategoryProducts = (): Promise<
  ClientResponse<CategoryPagedQueryResponse>
> => {
  return apiRoot.categories().get().execute();
};

// export const getProducts = (
//   page?: number,
//   productInPage?: number,
// ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
//   return apiRoot
//     .productProjections()
//     .get({ queryArgs: { limit: productInPage, offset: page } })
//     .execute();
// };

export const getProductById = (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot.productProjections().withId({ ID: productId }).get().execute();
};

export const getProducts = (
  page?: number,
  productInPage?: number,
  category?: string | string[],
  sorted?: string[] | string,
  searchText?: string,
): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit: productInPage,
        offset: page,
        filter: category,
        sort: sorted,
        'text.en-US': searchText,
        markMatchingVariants: true, // для чего?
        fuzzy: true, // для чего? можно тоже передавать в функцию как парамент
      },
    })
    .execute();
};

// export const SortProducts = (
//   sorted: string[] | string,
//   page?: number,
//   productInPage?: number,
// ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
//   return apiRoot
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         limit: productInPage,
//         offset: page,
//         sort: sorted,
//         markMatchingVariants: true,
//       },
//     })
//     .execute();
// };

// export const FilterProducts = (
//   category: string[] | string,
//   page?: number,
//   productInPage?: number,
// ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
//   return apiRoot
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         limit: productInPage,
//         offset: page,
//         filter: category,
//         markMatchingVariants: true,
//       },
//     })
//     .execute();
// };

// export const searchProducts = (
//   searchText: string,
//   page?: number,
//   productInPage?: number,
// ): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> => {
//   return apiRoot
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         limit: productInPage,
//         'text.en-US': searchText,
//         // offset: page,
//         markMatchingVariants: true,
//         fuzzy: true,
//       },
//     })
//     .execute();
// };

export const getProductByKey = (
  productId: string,
): Promise<ClientResponse<ProductProjection>> => {
  return apiRoot
    .productProjections()
    .withKey({ key: productId })
    .get()
    .execute();
};

export const shopList = (): ByProjectKeyShoppingListsRequestBuilder => {
  return apiRoot.shoppingLists();
};

export const registerNewCustomer = (
  customerData: CustomerDraft,
): Promise<ClientResponse<CustomerSignInResult>> => {
  return apiRoot
    .customers()
    .post({
      body: customerData,
    })
    .execute();
};

export const getAllCustomers = (): Promise<Object> => {
  return apiRoot.customers().get().execute();
};

export const getCustomerID = (
  customerID: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot.customers().withId({ ID: customerID }).get().execute();
};

export const customersIdPostExecute = (
  customerID: string,
  version: number,
  actions: CustomerUpdateAction[],
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: version,
        actions: actions,
      },
    })
    .execute();
};

export const newPassword = (
  customerID: string,
  version: number,
  currentPassword: string,
  newPassword: string,
): Promise<ClientResponse<Customer>> => {
  return apiRoot
    .customers()
    .password()
    .post({
      body: {
        id: customerID,
        version: version,
        currentPassword: currentPassword,
        newPassword: newPassword,
      },
    })
    .execute();
};

export const cartID = (cartID: string): Promise<ClientResponse<Cart>> => {
  return apiRoot.carts().withId({ ID: cartID }).get().execute();
};

export const cartAll = (): Promise<ClientResponse<CartPagedQueryResponse>> => {
  return apiRoot.carts().get().execute();
};

export const cartDraft = (cartID: string): Promise<ClientResponse<Cart>> => {
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
  customerID: string,
  version: number,
  actions: CartAddLineItemAction[],
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
