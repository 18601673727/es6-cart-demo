import $ from 'jquery';
import Cart from './cart';
import Data from '../../storage';

export default class App {
    constructor() {
        this.cart = new Cart(
            $('#products-container'),
            Data
        );

        this.render();
    }

    render() {
        this.cart.render();
    }
}

window.App = new App || {};
window.jQuery = $;
