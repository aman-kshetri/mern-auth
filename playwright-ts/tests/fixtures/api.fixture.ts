import { test as base, expect } from '@playwright/test';
import { APIClient } from '../../utils/apiClient';

type APIFixtures = {
  api: APIClient;
};

export const test = base.extend<APIFixtures>({
  api: async ({ request }, use) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    await use(api);
  },
});

export { expect };