// TODO: write your code here

import { CardValidatorWidget } from './CardValidatorWidget';

const container = document.getElementById('container');
const widget = new CardValidatorWidget(container);

widget.bindToDOM();