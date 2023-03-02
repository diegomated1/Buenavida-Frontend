import User from "./User.js";

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

        this.favoriteBtn = document.getElementById("modal-favorite-btn");
        this.favoriteBtnIcon = document.getElementById("modal-favorite-img");

        this.addListener();
    }

    addListener(){
        let a = this;
        this.modalClose.addEventListener('click', function(){
            a.changeVisibilty();
        });
        this.moreBtn.addEventListener('click', function(){
            a.inputAmount.innerHTML = parseInt(a.inputAmount.innerHTML) + 1;
            User.addCart(a.product, parseInt(a.inputAmount.innerHTML));
        });
        this.lessBtn.addEventListener('click', function(){
            if(a.inputAmount.innerHTML==0) return;
            a.inputAmount.innerHTML = parseInt(a.inputAmount.innerHTML) - 1;
            User.delCart(a.modalId, parseInt(a.inputAmount.innerHTML));
        });
        this.favoriteBtn.addEventListener('click', function(){
            if(a.modalISFavorite){
                User.removeFavorite(a.modalId);
                a.favoriteBtnIcon.src = "./resources/images/icons/heart_filled.png";
            }else{
                User.addFavorite(a.product);
                a.favoriteBtnIcon.src = "./resources/images/icons/heart.png";
            }
            a.modalISFavorite = !a.modalISFavorite;
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

    changeInfo(product){
        this.product = product;
        this.modalTitle.innerHTML = product.title;
        this.modalImage.innerHTML = product.id;
        this.modalId = product.id;
        this.modalAmount.innerHTML = product.amount;
        this.modalPrice.innerHTML = product.price;
        this.modalPriceUnit.innerHTML = product.price;
        this.modalDescription.innerHTML = product.description;
        this.modalISFavorite = product.favourite;
    }
}

export default new ModalProduct();