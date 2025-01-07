import {createRequire} from 'module';
import prettier from 'eslint-config-prettier';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import eslintPluginPrettier from 'eslint-plugin-prettier';

const require = createRequire(import.meta.url); // Для импорта CommonJS модулей

export default [
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			prettier: eslintPluginPrettier,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_' },
			],
			'prettier/prettier': 'error',
			...prettier.rules,
		},
	},
];
