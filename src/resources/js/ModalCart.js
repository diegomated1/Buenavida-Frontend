
import User from './User.js';

class ModalCart{

    constructor(){
        this.modal = document.getElementById("modal-cart");
        this.productList = document.getElementById("modal-cart-products");
        this.cartTitleAndLength = document.getElementById("modal-cart-title-and-length");
        this.modal.style.visibility = 'hidden';
        this.visibility = false;

        this.modalSubTotalText = document.getElementById("modal-cart-subtotal-number-text");
        this.modalTotalText = document.getElementById("modal-cart-total-number-text");
        this.modalLeftText = document.getElementById("modal-cart-products-free-ship");
        this.modalSubTotal = 0,
        this.modalTotal = 0;

        this.closeModalBtn = document.getElementById("modal-cart-close");
        this.btnGoToCart = document.getElementById("modal-btn-go-cart");
        this.btnGoToCart = document.getElementById("modal-btn-pay");
        this.render();
        this.addListener();
    }

    addListener(){
        this.closeModalBtn.addEventListener('click', (e)=>{
                this.changeVisibilty();
        });
    }

    changeVisibilty(){
        if(this.visibility){
            this.visibility = false;
            this.modal.style.visibility = 'hidden';
        }else{
            this.visibility = true;
            this.modal.style.visibility = 'visible';
        }
    }

    render(){
        this.productList.innerHTML = "";
        let _ModalCardProducts = [];
        Object.values(User.cart).forEach(item=>{
            let _product = new ModalCartProduct(item.amount, item.product);
            this.modalSubTotal += _product.product.price;
            this.modalTotal += _product.product.price;
            this.productList.innerHTML += _product.render();
            _ModalCardProducts.push(_product);
        });
        _ModalCardProducts.forEach(product=>{
            product.addListener();
        });
        this.cartTitleAndLength.innerHTML = `MI CARRITO ${(_ModalCardProducts.length==0)?'':`(${_ModalCardProducts.length})`}`;
        this.modalSubTotalText.innerHTML = this.modalSubTotal + ' $';
        this.modalTotalText.innerHTML = this.modalTotal + ' $';
        this.modalLeftText.innerHTML = `Te faltan ${(45-this.modalTotal>0)?(45-this.modalLeft):'0'}$ para disfrutar del envio gratuito`;
    }

}

class ModalCartProduct{

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
        document.getElementById(`cart-btn-more-${this.product.id}`).addEventListener('click', (e)=>{
            this.changeAmount(User.addCart(this.product, 1));
        });
        document.getElementById(`cart-btn-less-${this.product.id}`).addEventListener('click', (e)=>{
            if(this.amount==1) return;
            this.changeAmount(User.delCart(this.product.id, 1));
        });
        document.getElementById(`cart-btn-close-${this.product.id}`).addEventListener('click', (e)=>{
            User.removeProductCart(this.product.id);
            document.getElementById(`modal-cart-hr-${this.product.id}`).remove();
            document.getElementById(`modal-cart-product-${this.product.id}`).remove();
        });
    }

    render(){
        return(
            `<div id="modal-cart-product-${this.product.id}" class="modal-cart-product">`+
                '<div class="modal-cart-product-image">'+
                    `<img src="./resources/images/products/${this.product.id}.jpg" alt="">`+
                '</div>'+
                '<div class="modal-cart-product-info">'+
                    '<div class="modal-cart-product-info-top">'+
                        '<div class="modal-cart-product-info-top-left">'+
                            '<span class="modal-cart-product-info-title">'+
                                `${this.product.title}`+
                            '</span>'+
                            '<span class="modal-cart-product-info-amount">'+
                                `${this.product.amount}`+
                            '</span>'+
                        '</div>'+
                        '<div class="modal-cart-product-info-top-right">'+
                            `<div id="cart-btn-close-${this.product.id}" class="modal-cart-product-info-remove">`+
                                '<img src="./resources/images/icons/close_gray.png" alt="">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-cart-product-info-bottom">'+
                        '<div class="cart-product-cantidad">'+
                            '<span>Cantidad:</span>'+
                        '</div>'+
                        '<div class="cart-product-amount">'+
                            `<div id="cart-amount-${this.product.id}" class="cart-product-amount-input">`+
                                `${this.amount}`+
                            '</div>'+
                            '<div class="cart-product-amount-buttons">'+
                                `<div id="cart-btn-more-${this.product.id}" class="cart-product-amount-btn">`+
                                    '+'+
                                '</div>'+
                                `<div id="cart-btn-less-${this.product.id}" class="cart-product-amount-btn">`+
                                    '-'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="cart-product-price">'+
                            `<span id="cart-product-total-price-${this.product.id}">${this.totalPrice} $</span>`+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
            `<hr id="modal-cart-hr-${this.product.id}" class="cart-product-hr">`
        )
    }

}

const modalCart = new ModalCart();

export default modalCart;