import User from "./User.js";
import ModalCart from "./ModalCart.js";

class Cart{

    constructor(){

        this.productListLength = document.getElementById("cart-products-title-text");
        this.productList = document.getElementById("cart-products-list");

        this.total = 0;
        this.subTotal = 0;

        this.totalText = document.getElementById("cart-summary-total-text");
        this.subTotalText = document.getElementById("cart-summary-subtotal-text");
        this.btnConfirmOrde = document.getElementById("cart-summary-btn");
        this.render();
    }

    render(){
        this.productList.innerHTML = "";
        this.subTotal = 0;
        this.total = 0;
        let _CardProducts = [];
        Object.values(User.cart).forEach(item=>{
            let _product = new CartProduct(item.amount, item.product);
            this.subTotal += _product.totalPrice;
            this.total += _product.totalPrice;
            this.productList.innerHTML += _product.render();
            _CardProducts.push(_product);
        });
        _CardProducts.forEach(product=>{
            product.addListener();
        });
        this.productListLength.innerHTML = `${(_CardProducts.length==0)?'Ningun Articulo':`${_CardProducts.length} Articulos`}`;
        this.subTotalText.innerHTML = this.subTotal + ' $';
        this.totalText.innerHTML = this.total + ' $';
    }

}

class CartProduct{

    constructor(amount, product){
        this.product = product;
        this.amount = amount;
        this.totalPrice = parseFloat(this.product.price)*parseInt(this.amount);
    }

    changeAmount(newAmount){
        this.amount = newAmount;
        document.getElementById(`cart-amount-${this.product.id}`).innerHTML = newAmount;
        this.totalPrice = parseFloat(this.product.price)*parseInt(this.amount);
        document.getElementById(`cart-product-total-price-${this.product.id}`).innerHTML = `${this.totalPrice} $`;
    }

    addListener(){
        document.getElementById(`page-cart-btn-more-${this.product.id}`).addEventListener('click', (e)=>{
            console.time("render_cart");
            User.addCart(this.product, 1)
            cart.render();
            ModalCart.render();
            console.timeEnd("render_cart");
        });
        document.getElementById(`page-cart-btn-less-${this.product.id}`).addEventListener('click', (e)=>{
            console.time("render_cart");
            if(this.amount==1) return;
            User.delCart(this.product.id, 1)
            cart.render();
            ModalCart.render();
            console.timeEnd("render_cart");
        });
        document.getElementById(`page-cart-btn-close-${this.product.id}`).addEventListener('click', (e)=>{
            console.time("render_cart");
            User.removeProductCart(this.product.id);
            cart.render();
            ModalCart.render();
            console.timeEnd("render_cart");
        });
    }

    render(){
        return(
            '<div class="cart-product-item">'+
                '<div class="cart-product-image">'+
                    `<img src="./resources/images/products/${this.product.id}.jpg" alt="">`+
                '</div>'+
                '<div class="cart-product-info">'+
                    '<div class="cart-product-info-name">'+
                        `<span><strong>${this.product.title}</strong></span>`+
                    '</div>'+
                    '<div class="cart-product-info-talla">'+
                        `<span>Talla: ${this.product.amount}</span>`+
                    '</div>'+
                    '<div class="cart-product-info-made">'+
                        '<span>Marca: Natura Siberica</span>'+
                    '</div>'+
                '</div>'+
                '<div class="cart-product-text">'+
                    '<span>Cantidad</span>'+
                '</div>'+
                '<div class="cart-product-amount-container">'+
                    '<div class="cart-product-amount-2">'+
                        '<div class="cart-product-amount-input">'+
                            `<input type="text" value="${this.amount}">`+
                        '</div>'+
                        '<div class="cart-product-amount-buttons">'+
                            `<div id="page-cart-btn-more-${this.product.id}" class="cart-product-amount-btn">`+
                                '+'+
                            '</div>'+
                            `<div id="page-cart-btn-less-${this.product.id}" class="cart-product-amount-btn">`+
                                '-'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '<div class="cart-product-total-price">'+
                    `<span><strong>${this.totalPrice} $</strong></span>`+
                '</div>'+
                '<div class="cart-product-btn-delete-container">'+
                    `<button id="page-cart-btn-close-${this.product.id}" class="cart-product-btn-delete">`+
                        '<img src="./resources/images/icons/trash-bin.png" alt="">'+
                    '</button>'+
                '</div>'+
            '</div>'
        )
    }

}

const cart = new Cart();
export default cart;
