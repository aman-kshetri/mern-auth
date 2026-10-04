import { test, expect } from '../fixtures/auth.fixture';

test.describe('Authenticated User', () => {

  test('should access the home page when authenticated', async ({
    page,
    authenticatedPage,
  }) => {
    await expect(page).toHaveURL('/');

    await expect(
      page.getByText(/Hey/i)
    ).toBeVisible();
  });

});