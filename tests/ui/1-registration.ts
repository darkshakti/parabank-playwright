import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
    const registrationUrl = 'https://parabank.parasoft.com/parabank/register.htm';

    test('Successful registration', async ({ page }) => {
        await page.goto(registrationUrl);

        // Заполнение регистрационной формы
        await page.fill('#customer.firstName', 'John');
        await page.fill('#customer.lastName', 'Doe');
        await page.fill('#customer.address.street', '123 Main St');
        await page.fill('#customer.address.city', 'New York');
        await page.fill('#customer.address.state', 'NY');
        await page.fill('#customer.address.zipCode', '10001');
        await page.fill('#customer.phoneNumber', '1234567890');
        await page.fill('#customer.ssn', '123-45-6789');
        await page.fill('#customer.username', 'johndoe');
        await page.fill('#customer.password', 'password123');
        await page.fill('#repeatedPassword', 'password123');

        // Отправка формы
        await page.click('input[value="Register"]');

        // Проверка успешной регистрации
        const successMessage = await page.locator('.title').textContent();
        expect(successMessage).toContain('Welcome John Doe');
    });
});
