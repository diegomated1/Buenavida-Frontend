import User from "../User.js";
import modalCart from "./ModalCart.js";
class ModalProduct{

    constructor(){
        this.product = null;
        this.modal = document.getElementById("modal-product");
        this.modal.style.visibility = 'hidden';
        this.visibility = false;

        this.modalTitle = document.getElementById("modal-product-info-title");
        this.modalImage = document.getElementById("modal-image");
        this.modalAmount = document.getElementById("modal-stock");
        this.modalPrice = document.getElementById("modal-price");
        this.modalPriceUnit = document.getElementById("modal-price-unit");
        this.modalDescription = document.getElementById("modal-description");
        this.modalISFavorite = false;
        this.modalId = '0';

        this.inputAmount = document.getElementById("info-amount-input");
        this.moreBtn = document.getElementById("info-amount-buttons-more");
        this.lessBtn = document.getElementById("info-amount-buttons-less");
        this.addCartBtn = document.getElementById("modal-product-btn-add-cart");
        this.modalClose = document.getElementById("modal-close");
        this.favoriteBtn = document.getElementById("modal-favorite-btn");
        this.favoriteBtnIcon = document.getElementById("modal-favorite-img");

        this.addListener();
    }

    addListener(){
        this.modalClose.addEventListener('click', ()=>{
            this.changeVisibilty();
        });
        this.moreBtn.addEventListener('click', ()=>{
            this.inputAmount.value = parseInt(this.inputAmount.value) + 1;
        });
        this.lessBtn.addEventListener('click', ()=>{
            if(this.inputAmount.value==1) return;
            this.inputAmount.value = parseInt(this.inputAmount.value) - 1;
        });
        this.inputAmount.addEventListener('change', (e)=>{
            if(parseInt(e.target.value)<=0){
                e.target.value = 1;
            }
        });
        this.addCartBtn.addEventListener('click', ()=>{
            User.addCart(this.product, parseInt(this.inputAmount.value), ()=>{
                modalCart.render();
                alert(`(${this.inputAmount.value}) '${this.product.title}' Añadidos al carrito`);
            });
        });
        this.favoriteBtn.addEventListener('click', ()=>{
            this.changeFavorite();
        });
    }

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

    changeFavorite(){
        if(this.product.favourite){
            this.favoriteBtnIcon.src = "./resources/images/icons/heart_filled_red.png";
            this.product.changeFavorite();
        }else{
            this.favoriteBtnIcon.src = "./resources/images/icons/heart_filled.png";
            this.product.changeFavorite();
        }
    }

    changeInfo(product){
        this.product = product;
        this.modalTitle.innerHTML = product.title;
        this.modalImage.src = `./resources/images/products/${product.id}.jpg`;
        this.modalId = product.id;
        this.modalAmount.innerHTML = product.amount;
        this.modalPrice.innerHTML = product.price;
        this.modalPriceUnit.innerHTML = product.price;
        this.modalDescription.innerHTML = product.description;
        if(product.favourite){
            this.favoriteBtnIcon.src = "./resources/images/icons/heart_filled_red.png";
        }else{
            this.favoriteBtnIcon.src = "./resources/images/icons/heart_filled.png";
        }
    }
}

const modalProduct = new ModalProduct();

export default modalProduct;