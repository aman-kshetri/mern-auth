export const generateTestUser = () => {
    const timestamp = Date.now();

    return {
        username: `Playwright User ${timestamp}`,
        email: `playwright.${timestamp}@example.com`,
        password: 'Password1234',
    };
};

export const invalidUser = {
    username: 'Invalid User',
    email: 'invalid-email',
    password: '123',
}

export const existingUser = {
    username: 'Existing User',
    email: 'existing.user@example.com',
    password: 'Password1234',
}