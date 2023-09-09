import { ctpClient } from './BuildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { manageClient } from './BuildManageClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: process.env.REACT_APP_CTP_PROJECT_KEY || '',
});

export const apiRootManage = createApiBuilderFromCtpClient(
  manageClient,
).withProjectKey({
  projectKey: process.env.REACT_APP_MANAGE_CTP_PROJECT_KEY || '',
});
