
import navbar from '../NavBar.js';
import User from '../User.js';
var Cart = null;
import("../Cart.js")
  .then((cart) => {
    Cart = cart.default;
  }).catch(()=>{});

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
        this.btnGoToPay = document.getElementById("modal-btn-pay");
        this.render();
        this.addListener();
    }

    /**
     * Function to add event listeners
     */
    addListener(){
        this.closeModalBtn.addEventListener('click', (e)=>{
            this.changeVisibilty();
        });
        this.btnGoToCart.addEventListener('click', (e)=>{
            window.location.href = "cart.html";
        });
    }

    /**
     * change the visibility of the modal
     * @param {*} visible param for change visibility manually 
     */
    changeVisibilty(visible){
        if(visible!=undefined){
            this.visibility = visible;
            this.modal.style.visibility = visible ? 'visible' : 'hidden';
        }else if(this.visibility){
            this.visibility = false;
            this.modal.style.visibility = 'hidden';
        }else{
            this.visibility = true;
            this.modal.style.visibility = 'visible';
        }
    }

    /**
     * Renders products, total, subtotal in the cart modal
     */
    render(){
        //console.time("render_cart");
        this.productList.innerHTML = "";
        this.modalSubTotal = 0;
        this.modalTotal = 0;
        let _ModalCardProducts = [];
        var total_amount = 0;
        Object.values(User.getCart()).forEach(item=>{
            total_amount += item.amount;
            let _product = new ModalCartProduct(item.amount, item.product);
            this.modalSubTotal += _product.totalPrice;
            this.modalTotal += _product.totalPrice;
            this.productList.innerHTML += _product.render();
            _ModalCardProducts.push(_product);
        });
        this.modalSubTotal = parseFloat(this.modalSubTotal.toFixed(2));
        this.modalTotal = parseFloat(this.modalSubTotal);
        _ModalCardProducts.forEach(product=>{
            product.addListener();
        });
        this.cartTitleAndLength.innerHTML = `MI CARRITO ${(total_amount==0)?'':`(${total_amount})`}`;
        this.modalSubTotalText.innerHTML = this.modalSubTotal + ' $';
        this.modalTotalText.innerHTML = this.modalTotal + ' $';
        this.modalLeftText.innerHTML = `Te faltan ${(45-this.modalTotal>0)?(45-this.modalTotal):'0'}$ para disfrutar del envio gratuito`;
        //console.timeEnd("render_cart");
    }

}

class ModalCartProduct{

    constructor(amount, product){
        this.product = product;
        this.amount = amount;
        this.totalPrice = parseFloat(this.product.price)*parseInt(this.amount);
    }

    /**
     * Function to add event listeners
     */
    addListener(){
        // Add one product to cart
        document.getElementById(`cart-btn-more-${this.product.id}`).addEventListener('click', (e)=>{
            User.addCart(this.product, 1, ()=>{
                modalCart.render();
                navbar.render();
                if(Cart){
                    Cart.render();
                }
            });
        });
        // Remove one product from cart
        document.getElementById(`cart-btn-less-${this.product.id}`).addEventListener('click', (e)=>{
            if(this.amount==1) return;
            User.delCart(this.product.id, 1, ()=>{
                modalCart.render();
                navbar.render();
                if(Cart){
                    Cart.render();
                }
            });
        });
        // Remove the product from cart
        document.getElementById(`cart-btn-close-${this.product.id}`).addEventListener('click', (e)=>{
            User.removeProductCart(this.product.id, ()=>{
                modalCart.render();
                navbar.render();
                if(Cart){
                    Cart.render();
                }
            });
        });
    }

    /**
     * @returns HTML for the products in the cart modal
     */
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
                            `<span id="cart-product-total-price-${this.product.id}">
                                ${(this.totalPrice.toFixed(2))}
                            $</span>`+
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