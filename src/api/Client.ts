import { ctpClient } from './BuildClient';
import {
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import { ApiRequest } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/requests-utils';

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
