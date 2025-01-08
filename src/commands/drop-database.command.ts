import { request, APIResponse } from '@playwright/test';

export class DropDatabaseCommand {
	async execute(): Promise<void> {
		const context = await request.newContext();

		const response: APIResponse = await context.post(
			`${process.env.API_URL}cleanDB`,
			{
				headers: {
					Accept: 'application/xml',
				},
			},
		);

		const status = response.status();

		console.log(`The status of dropping Database is ${status}`);

		if (status !== 204) {
			throw new Error(
				`Failed to drop the database, status code: ${response.status()}`,
			);
		}

		console.log('Database successfully dropped');
	}
}
