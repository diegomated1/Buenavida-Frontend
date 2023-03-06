import ModalCart from "./ModalCart.js";
import ModalProduct from "./ModalProduct.js";
import User from "./User.js";

class Product{

    constructor(product){
        this.id = product.id;
        this.title = product.title;
        this.amount = product.amount;
        this.price = product.price;
        this.description = product.description;
        this.favourite = (User.favorites[this.id])?true:false;
        this.discount = product.discount;
        this.discountUni = product.discountUni;
    }
    
    getProductInfo(){
        return({
            id: this.id,
            title: this.title,
            amount: this.amount,
            price: this.price,
            description: this.description,
            favourite: this.favourite,
            discount: this.discount,
            discountUni: this.discountUni
        })
    }

    addListener(){
        document.getElementById(`product-${this.id}`).addEventListener('click', (e)=>{
            var node = e.target;
            while(node !== this){
                if(node===null){
                    ModalProduct.changeVisibilty();
                    ModalProduct.changeInfo(this.getProductInfo());
                    return;
                }else if(node.id){
                    if(node.id.startsWith('product-btn-add-cart-')){
                        User.addCart(this.getProductInfo(), 1);
                        ModalCart.render();
                        alert(`(1) '${this.title}' Añadido al carrito`);
                        return;
                    }else if(node.id.startsWith('product-fav-icon-')){
                        this.changeFavorite();
                        return;
                    }
                }
                node = node.parentNode;
            }
        });

        // PRODUCTO ELEVADO
        const product = document.getElementById(`product-${this.id}`);
        var isOver = false;
        product.addEventListener('mouseover', (e)=>{
            if(isOver) return;
            product.style.height = '420px';
            product.style.zIndex = '10';
            this.changeFavIconVisibility();
            product.innerHTML = product.innerHTML + this.renderProductAddCartBtn();
            isOver = true;
        });
        product.addEventListener('mouseleave', (e)=>{
            isOver = false;
            product.style.height = '350px';
            product.style.zIndex = '0';
            this.changeFavIconVisibility();
            document.getElementById(`product-btn-add-cart-container-${this.id}`).remove();
        });
    }

    renderProductAddCartBtn(){
        return(
            `<div id="product-btn-add-cart-container-${this.id}" class="product-add-cart-container">`+
                `<button id="product-btn-add-cart-${this.id}">`+
                    '<div>'+
                        '<img src="./resources/images/icons/cesta-de-la-compra-blanca.png" alt="">'+
                    '</div>'+
                    '<strong>Añadir a la cesta</strong>'+
                '</button>'+
            '</div>'
        )
    }

    changeFavorite(){
        const favIcon = document.getElementById(`product-fav-icon-${this.id}`);
        if(this.favourite){
            favIcon.querySelector('img').src = './resources/images/icons/heart_filled.png';
            this.favourite = false;
            User.removeFavorite(this.id);
        }else{
            favIcon.querySelector('img').src = './resources/images/icons/heart_filled_red.png';
            this.favourite = true;
            User.addFavorite(this.getProductInfo());
        }
    }

    changeFavIconVisibility(){
        const favIcon = document.getElementById(`product-fav-icon-${this.id}`);
        if(favIcon.style.visibility == 'hidden'){
            favIcon.style.visibility = 'visible';
        }else{
            favIcon.style.visibility = 'hidden';
        }
    }

    renderToModal(){
        ModalProduct.changeInfo(this.getProductInfo());
    }

    renderToGrilla(){
        return(
            `<div id="product-${this.id}" class="product">`+
                '<div class="product-offert">'+
                    '<div class="product-is-offert">'+
                    `${(this.discount!=0) ? (
                        '<div class="product-offert-icon">'+
                            `<span><strong+>- ${this.discount*-1}%</strong`+
                            `</span><span><strong>${this.discountUni}</strong></span>`+
                        '</div>'
                    ):''}`+
                    '</div>'+
                    '<div class="product-fav">'+
                        `<div style="visibility: hidden;" id="product-fav-icon-${this.id}" class="product-fav-icon">`+
                            `<img src="./resources/images/icons/${this.favourite?'heart_filled_red':'heart_filled'}.png">`+
                        '</div>'+
                    '</div>'+
                '</div>'+
                `<div id="product-image-${this.id}" class="product-image">`+
                    `<img src="./resources/images/products/${this.id}.jpg" alt="">`+
                '</div>'+
                '<div class="product-name">'+
                `<span><strong>${this.title}</strong></span>`+
                '</div>'+
                '<div class="product-description">'+
                    '<div class="product-desc-cant">'+
                        `<span><strong>${this.amount}</strong></span>`+
                    '</div>'+
                    '<div class="product-desc">'+
                        `<span>Natura</span>`+
                    '</div>'+
                '</div>'+
                '<div class="product-price">'+
                    `<span><strong>${this.price} €</strong></span>`+
                '</div>'+
            '</div>'
        )
    }

}

export default Product;
