import { ctpClient } from './BuildClient';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerSignin,
  CustomerSignInResult,
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

export const getProducts = (): Promise<
  ClientResponse<ProductProjectionPagedQueryResponse>
> => {
  return apiRoot.productProjections().get().execute();
};

export const shopList = (): ByProjectKeyShoppingListsRequestBuilder => {
  return apiRoot.shoppingLists();
};
