import { CardValidatorWidget } from '../js/CardValidatorWidget';

describe('CardValidatorWidget DOM', () => {
    let container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should render markup correctly', () => {
        const widget = new CardValidatorWidget(container);
        widget.bindToDOM();

        expect(container.querySelector('.card-validator-form')).not.toBeNull();
        expect(container.querySelector('.input')).not.toBeNull();
    });
});
