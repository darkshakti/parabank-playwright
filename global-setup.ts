import { DropDatabaseCommand } from './src/commands';
import { chromium, expect } from '@playwright/test';

export default async function () {
	console.log('Droping database...');
	await new DropDatabaseCommand().execute();

	// TODO сделать инициализацию базы

	const browser = await chromium.launch({
		args: ['--ignore-certificate-errors'],
	});
	const context = await browser.newContext();
	try {
		await context.tracing.start({ screenshots: true });
		const page = await context.newPage();

		await page.goto(`${process.env.BASE_URL}index.htm`, {
			waitUntil: 'networkidle',
		});

		// Выполнение логина, если нужно
		await page
			.locator('input[name="username"]')
			.fill(process.env.LOGIN_USERNAME);
		await page
			.locator('input[name="password"]')
			.fill(process.env.LOGIN_PASSWORD);
		await page.getByRole('button', { name: 'Log In' }).click();
		const welcomeTextLocator = page.getByText('Welcome');
		await expect(welcomeTextLocator).toBeVisible({ timeout: 15000 });
		await expect(welcomeTextLocator).not.toBeHidden({ timeout: 5000 });
	} catch (e) {
		throw new Error(`Global setup failed. Error: ${e}`);
	} finally {
		await context.tracing.stop({ path: './global-setup.zip' });
		await browser.close();
		console.log('Successful login');
	}
}
