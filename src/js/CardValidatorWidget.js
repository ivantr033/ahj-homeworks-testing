import { validateLuhn, getCardType } from "./validators";

export class CardValidatorWidget {
    constructor(parentEl) {
        this.parentEl = parentEl;
        this.onSubmit = this.onSubmit.bind(this);
        this.onInput = this.onInput.bind(this);
    }

    static get markup() {
        return `
            <div class="card-validator">
            <ul class="cards">
                <li class="card visa" data-type="visa">Visa</li>
                <li class="card mastercard" data-type="mastercard">Mastercard</li>
                <li class="card mir" data-type="mir">Mir</li>
                <li class="card amex" data-type="amex">Amex</li>
                <li class="card diners" data-type="diners">Diners</li>
                <li class="card discover" data-type="discover">Discover</li>
                <li class="card jcb" data-type="jcb">JCB</li>
            </ul>
            <form class="card-validator-form">
                <input type="text" class="input" placeholder="4111111111111111">
                <button class="submit-btn">Click to Validate</button>
            </form>
            </div>
    `;
    }

    bindToDOM() {
        this.parentEl.innerHTML = CardValidatorWidget.markup;
        this.element = this.parentEl.querySelector(".card-validator-form");
        this.input = this.element.querySelector(".input");
        this.cards = this.parentEl.querySelectorAll(".card");

        this.element.addEventListener("submit", this.onSubmit);
        this.input.addEventListener("input", this.onInput);
    }

    onInput() {
        const cardType = getCardType(this.input.value);
        this.cards.forEach((card) => {
            if (cardType && card.dataset.type === cardType) {
                card.classList.add("active");
                card.classList.remove("inactive");
            } else if (cardType) {
                card.classList.add("inactive");
                card.classList.remove("active");
            } else {
                card.classList.remove("active", "inactive");
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const value = this.input.value;
        const isValid = validateLuhn(value);

        if (isValid) {
            this.input.classList.add("valid");
            this.input.classList.remove("invalid");
        } else {
            this.input.classList.add("invalid");
            this.input.classList.remove("valid");
        }
    }
}
