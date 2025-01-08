class ConfigService {
	constructor() {}

	get(name: string): string {
		return process.env[name];
	}

	getLoginPassword() {
		return this.get('LOGIN_PASSWORD');
	}

	getLoginUsername() {
		return this.get('LOGIN_USERNAME');
	}

	getTestParallelIndex(): string {
		return this.get('TEST_PARALLEL_INDEX');
	}

	getTestWorkerIndex(): string {
		return this.get('TEST_WORKER_INDEX');
	}

	getBaseUrl() {
		return this.get('BASE_URL');
	}

	isCi(): boolean {
		return this.get('CI') === 'true';
	}
}

export const configService = new ConfigService();
