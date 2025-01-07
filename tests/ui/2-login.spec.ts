import {expect, test} from '@playwright/test';
import { page } from '../../src/setup';
import { RandomNumber } from '../../src/utils';

const rnd = RandomNumber.generateRnd();

test.beforeAll(async ({}) => {
    await page.goto('register.htm');

    // Заполнение регистрационной формы
    await page.locator('[id="customer.firstName"]').fill(`John_${rnd}`);
    await page.locator('[id="customer.lastName"]').fill(`Doe_${rnd}`);
    await page.locator('[id="customer\\.address\\.street"]').fill('123 Main St');
    await page.locator('[id="customer\\.address\\.city"]').fill('New York');
    await page.locator('[id="customer\\.address\\.state"]').fill('NY');
    await page.locator('[id="customer\\.address\\.zipCode"]').fill('10001');
    await page.locator('[id="customer\\.phoneNumber"]').fill('8810001668');
    await page.locator('[id="customer\\.ssn"]').fill('123-45-6789');
    await page.locator('[id="customer\\.username"]').fill(`johndoe_${rnd}`);
    await page.locator('[id="customer\\.password"]').fill(`password123_${rnd}`);
    await page.locator('#repeatedPassword').fill(`password123_${rnd}`);

    // Отправка формы
    await page.getByRole('button', { name: 'Register' }).click();

    // Проверка успешной регистрации
    await expect(page.getByRole('heading', { name:`Welcome johndoe_${rnd}`})).toBeVisible();
});

test.describe('Login', () => {
    test('Test-1: Successful login', async ({ page }) => {
        await page.goto('index.htm');
        await page.locator('input[name="username"]').fill(`johndoe_${rnd}`);
        await page.locator('input[name="password"]').fill(`password123_${rnd}`);
        await page.getByRole('button', { name: 'Log In' }).click();
        // await page.pause();

        // Переход на страницу Accounts Overview
        await expect(page).toHaveURL(/.*overview/)

        // Успешная авторизация
        await expect(page.getByText(`Welcome John_${rnd} Doe_${rnd}`)).toBeVisible()
    });
});
