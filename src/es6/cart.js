import $ from 'jquery';
import md5 from 'md5';

class Cart {
    constructor(container, data) {
        this.body = container.find('tbody');
        this.footer = container.find('tfoot');
        this.products = data.products;
    }

    update(product, attr, newValue) {
        if (0 < newValue && newValue < 11) {
            product[attr] = newValue;
        } else {
            window.alert('Sorry but we can\'t handle that request, please check if the quantity was correct.');
        }

        this.render();
    }

    remove(product) {
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.render();
    }

    render() {
        this.body.empty();
        this.footer.empty();

        this.products.map((product, index) => {
            let id = md5('product' + new Date().getTime().toString() + index.toString());
            this.products.map((product) => {
                product.cost = (product.price * product.qty).toFixed(2);
            });

            this.body.append(`
                <tr id="${id}">
                    <td class="col-xs-10">${product.name}</td>
                    <td>&pound;${product.price}</td>
                    <td class="col-xs-2">
                        <input type="text" class="qty-input" value="${product.qty}">
                        <div class="qty-group">
                            <div class="qty-btn plus">+</div>
                            <div class="qty-btn minus">-</div>
                        </div>
                    </td>
                    <td>&pound;${product.cost}</td>
                    <td><div class="icon-trash" title="Remove"></div></td>
                </tr>
            `);

            $(`#${id}`)
                .on('click', '.plus', (e) => {
                    let qtyInput = $(e.target).parent().siblings('.qty-input');
                    this.update(product, 'qty', parseInt(qtyInput.val()) + 1);
                })
                .on('click', '.minus', (e) => {
                    let qtyInput = $(e.target).parent().siblings('.qty-input');
                    this.update(product, 'qty', parseInt(qtyInput.val()) - 1);
                })
                .on('click', '.icon-trash', (e) => {
                    this.remove(product);
                })
                .find('.qty-input').on('keyup', (e) => {
                    this.update(product, 'qty', parseInt($(e.target).val()));
                });
        });

        const VAT = 0.20;
        let subTotal = parseFloat(this.products.reduce((sum, product) => sum + parseFloat(product.cost), 0).toFixed(2));
        let tax = parseFloat((subTotal * VAT).toFixed(2));
        let total = (subTotal + tax).toFixed(2);

        let submitButton = `
            <tr>
                <td colspan="3"></td>
                <td colspan="1">
                    <button id="submit" class="btn btn-lg btn-primary" type="button" ` + (this.products.length ? '' : 'disabled' ) + `>Buy Now &raquo;</button>
                </td>
            </tr>
        `;

        let cartFooter = `
            <tr><td colspan="4"></td></tr>
            <tr><td colspan="4"></td></tr>
            <tr class="p-t-15 text-muted">
                <td>Subtotal</td>
                <td colspan="2"></td>
                <td>&pound;${subTotal}</td>
            </tr>
            <tr class="text-muted">
                <td>VAT @ ${VAT * 100}%</td>
                <td colspan="2"></td>
                <td>&pound;${tax}</td>
            </tr>
            <tr><td colspan="4"></td></tr>
            <tr class="text-strong">
                <td>Total Cost</td>
                <td colspan="2"></td>
                <td>&pound;${total}</td>
            </tr>
            <tr><td colspan="4"></td></tr>
            <tr><td colspan="4"></td></tr>
            ${submitButton}
        `;

        this.footer.append(cartFooter);

        $('#submit').on('click', (e) => {
            e.preventDefault();
            let products = this.products;

            const postData = {
                products,
                subTotal,
                tax,
                total
            };

            $.ajax({
                url: '',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(postData),
                dataType: 'json',
                complete: function() {
                    window.alert('Request is complete!');
                }
            });
        });
    }
}

export default Cart;
