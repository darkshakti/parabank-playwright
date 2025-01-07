import {expect, test} from '@playwright/test';
import { RandomNumber } from '../../src/utils';


test.describe('User Registration', () => {
	const rnd = RandomNumber.generateRnd();

	test('Test-1: Successful registration', async ({ page }) => {
		await page.goto('register.htm');

		// Заполнение регистрационной формы
		await page.locator('[id="customer.firstName"]').fill('John');
		await page.locator('[id="customer.lastName"]').fill('Doe');
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
		await expect(page.getByText('Your account was created successfully. You are now logged in.')).toBeVisible();
	});
});
