import { validateLuhn, getCardType } from '../js/validators';

describe('validators logic', () => {
    test('validateLuhn should return true for valid card numbers', () => {
        // Tarjeta Visa de prueba válida
        expect(validateLuhn('4000000000000002')).toBe(true);
    });

    test('validateLuhn should return false for invalid card numbers', () => {
        expect(validateLuhn('4000000000000001')).toBe(false);
    });

    test('getCardType should correctly identify card systems', () => {
        expect(getCardType('4111111111111111')).toBe('visa');
        expect(getCardType('5100000000000000')).toBe('mastercard');
        expect(getCardType('2200000000000000')).toBe('mir');
    });
});
