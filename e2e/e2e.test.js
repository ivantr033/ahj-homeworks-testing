import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
    let browser = null;
    let page = null;
    let server = null;
    const baseUrl = 'http://localhost:9000';

    beforeEach(async () => {
        browser = await puppeteer.launch({
            headless: false, // Cámbialo a true si prefieres no ver la ventana abriéndose
            slowMo: 100,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        page = await browser.newPage();
    });

    afterEach(async () => {
        if (browser) await browser.close();
        if (server) server.kill();
    });

    test('should validate correct card number', async () => {
        await page.goto(baseUrl);

        const input = await page.$('.input');
        const submitBtn = await page.$('.submit-btn');

        // Tarjeta Visa válida (pasa Luhn)
        await input.type('4000000000000002');
        await submitBtn.click();

        // Verificamos que el input reciba la clase .valid
        await page.waitForSelector('.input.valid');
    });

    test('should mark incorrect card number as invalid', async () => {
        await page.goto(baseUrl);

        const input = await page.$('.input');
        const submitBtn = await page.$('.submit-btn');

        // Tarjeta inválida
        await input.type('4000000000000001');
        await submitBtn.click();

        // Verificamos que el input reciba la clase .invalid
        await page.waitForSelector('.input.invalid');
    });
});
