import fetch from 'node-fetch';
import {
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = process.env.REACT_APP_MANAGE_CTP_PROJECT_KEY || '';

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.REACT_APP_MANAGE_CTP_API_URL || '',
  fetch,
};

const options: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: projectKey,
  credentials: {
    clientId: process.env.REACT_APP_CTP_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_CTP_CLIENT_SECRET || '',
    user: {
      username: 'G1g77ggg@mail.ru',
      password: 'Aa111111',
    },
  },
  scopes: [`manage_project:${projectKey}`],
  fetch,
};

export const customClient = new ClientBuilder()
  .withPasswordFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();
