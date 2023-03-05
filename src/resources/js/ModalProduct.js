import User from "./User.js";
import modalCart from "./ModalCart.js";
class ModalProduct{

    constructor(){
        this.product = null;
        this.modal = document.getElementById("modal-product");
        this.modal.style.visibility = 'hidden';
        this.visibility = false;
        this.modalClose = document.getElementById("modal-close");

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

        this.favoriteBtn = document.getElementById("modal-favorite-btn");
        this.favoriteBtnIcon = document.getElementById("modal-favorite-img");

        this.addListener();
    }

    addListener(){
        this.modalClose.addEventListener('click', ()=>{
            this.changeVisibilty();
        });
        this.moreBtn.addEventListener('click', ()=>{
            this.inputAmount.innerHTML = parseInt(this.inputAmount.innerHTML) + 1;
        });
        this.lessBtn.addEventListener('click', ()=>{
            if(this.inputAmount.innerHTML==0) return;
            this.inputAmount.innerHTML = parseInt(this.inputAmount.innerHTML) - 1;
        });
        this.addCartBtn.addEventListener('click', ()=>{
            User.addCart(this.product, parseInt(this.inputAmount.innerHTML));
            modalCart.render();
            alert(`(${this.inputAmount.innerHTML}) '${this.product.title}' Añadidos al carrito`);
        });
        this.favoriteBtn.addEventListener('click', ()=>{
            if(this.modalISFavorite){
                User.removeFavorite(this.modalId);
                this.favoriteBtnIcon.src = "./resources/images/icons/heart_filled.png";
            }else{
                User.addFavorite(this.product);
                this.favoriteBtnIcon.src = "./resources/images/icons/heart.png";
            }
            this.modalISFavorite = !this.modalISFavorite;
        });
    }

    changeVisibilty(){
        if(this.visibility){
            this.visibility = false;
            this.modal.style.visibility = 'hidden';
            this.inputAmount.innerHTML = "1";
        }else{
            this.visibility = true;
            this.modal.style.visibility = 'visible';
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
        this.modalISFavorite = product.favourite;
    }
}

export default new ModalProduct();