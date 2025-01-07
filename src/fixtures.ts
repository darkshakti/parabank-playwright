import { test as base } from '@playwright/test';

const test = base.extend<{
    testFixture: string;
    autoTestFixture: string;
    unusedFixture: string;
}, {
    workerFixture: string;
    autoWorkerFixture: string;
}>({
    // workerFixture доступна для всего рабочего процесса
    workerFixture: [
        async ({ browser }, use) => {
            console.log('Настройка workerFixture');
            await use('workerFixture');
            console.log('Очистка workerFixture');
        },
        { scope: 'worker' }
    ],

    // autoWorkerFixture автоматически используется для рабочего процесса
    autoWorkerFixture: [
        async ({ browser }, use) => {
            console.log('Настройка autoWorkerFixture');
            await use('autoWorkerFixture');
            console.log('Очистка autoWorkerFixture');
        },
        { scope: 'worker', auto: true }
    ],

    // testFixture доступна только в рамках конкретного теста
    testFixture: [
        async ({ page, workerFixture }, use) => {
            console.log('Настройка testFixture');
            await use('testFixture');
            console.log('Очистка testFixture');
        },
        { scope: 'test' }
    ],

    // autoTestFixture автоматически используется в тестах
    autoTestFixture: [
        async ({}, use) => {
            console.log('Настройка autoTestFixture');
            await use('autoTestFixture');
            console.log('Очистка autoTestFixture');
        },
        { scope: 'test', auto: true }
    ],

    // unusedFixture, которая на самом деле не используется в тестах
    unusedFixture: [
        async ({ page }, use) => {
            console.log('Настройка unusedFixture');
            await use('unusedFixture');
            console.log('Очистка unusedFixture');
        },
        { scope: 'test' }
    ],
});

// Использование фикстур в тестах
test.beforeAll(async () => {
    console.log('beforeAll: Общая настройка для всех тестов');
});

test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Настройка перед каждым тестом');
});

test('first test', async ({ page }) => {
    console.log('Запуск первого теста');
});

test('second test', async ({ testFixture }) => {
    console.log('Запуск второго теста с использованием testFixture');
});

test.afterEach(async () => {
    console.log('afterEach: Очистка после каждого теста');
});

test.afterAll(async () => {
    console.log('afterAll: Очистка после всех тестов');
});
