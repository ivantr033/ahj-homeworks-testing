// Algoritmo de Luhn para validar números de tarjetas
export function validateLuhn(cardNumber) {
    const cleanNumber = String(cardNumber).replace(/\D/g, '');
    if (!cleanNumber.length) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Detectar franquicia según el BIN (prefijo)
export function getCardType(cardNumber) {
    const cleanNumber = String(cardNumber).replace(/\D/g, '');

    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^222[1-9]|^22[3-9]|^2[3-6]|^27[0-1]|^2720|^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^220[0-4]/.test(cleanNumber)) return 'mir';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^30[0-5]|^36|^38/.test(cleanNumber)) return 'diners';
    if (/^6011|^65/.test(cleanNumber)) return 'discover';
    if (/^35/.test(cleanNumber)) return 'jcb';

    return null;
}