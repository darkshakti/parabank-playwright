import {faker} from '@faker-js/faker';

export class RandomNumber {
    /**
     * Генерирует шестизначный случайный номер в виде строки
     */
    public static generateRnd(): string {
        const randomNumber = faker.number.int({ min: 100000, max: 999999 });
        return randomNumber.toString();
    }
}
