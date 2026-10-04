import { test, expect } from '../fixtures/auth.fixture';
import { HomePage } from '../../pages/HomePage';

test.describe('Logout', () => {

  test('should logout successfully', async ({
    page,
    authenticatedPage,
  }) => {
    const homePage = new HomePage(page);

    await expect(page).toHaveURL('/');

    await homePage.logout();

    await expect(page).toHaveURL('/');

    await homePage.expectLoggedOut();
  });

});