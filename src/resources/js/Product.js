import ModalAccount from "./modals/ModalAccount.js";
import ModalCart from "./modals/ModalCart.js";
import ModalProduct from "./modals/ModalProduct.js";
import navbar from "./NavBar.js";
import User from "./User.js";

class Product{

    constructor(product, uniqid){
        this.uniqid = uniqid;
        this.id = product.id;
        this.title = product.title;
        this.amount = product.amount;
        this.price = product.price;
        this.description = product.description;
        this.favourite = (User.getFavorites()[this.id])?true:false;
        this.discount = product.discount;
        this.discountUni = product.discountUni;
        this.discountPer = product.discountPer;
    }
    
    /**
     * @returns Object with the product info
     */
    getProductInfo(){
        return({
            id: this.id,
            title: this.title,
            amount: this.amount,
            price: this.price,
            description: this.description,
            favourite: this.favourite,
            discount: this.discount,
            discount: this.discountPer,
            discountUni: this.discountUni
        })
    }

    /**
     * Function to add listeners
     */
    addListener(){
        document.getElementById(`product-${this.uniqid}`).addEventListener('click', (e)=>{
            var node = e.target;
            while(node !== this){
                // Btn if click in the product show product modal
                if(node===null){
                    ModalProduct.changeVisibilty();
                    ModalCart.changeVisibilty(false);
                    ModalAccount.changeVisibilty(false);
                    ModalProduct.changeInfo(this);
                    return;
                }else if(node.id){
                    // Btn if click in the 'add cart btn' add one product to the cart
                    if(node.id.startsWith('product-btn-add-cart-')){
                        User.addCart(this.getProductInfo(), 1, ()=>{
                            ModalCart.render();
                            navbar.render();
                            alert(`(1) '${this.title}' Añadido al carrito`);
                        });
                        return;
                    }else 
                    // Btn to add or remove from favorites
                    if(node.id.startsWith('product-fav-icon-')){
                        this.changeFavorite();
                        return;
                    }
                }
                node = node.parentNode;
            }
        });

        // When hover product show the button 'add cart' and favorite button
        const product = document.getElementById(`product-${this.uniqid}`);
        var isOver = false;
        product.addEventListener('mouseover', (e)=>{
            if(isOver) return;
            product.style.height = '450px';
            product.style.zIndex = '10';
            this.changeFavIconVisibility();
            document.getElementById(`product-image-${this.uniqid}`).style.height = '250px';
            product.innerHTML = product.innerHTML + this.renderProductAddCartBtn();
            isOver = true;
        });
        product.addEventListener('mouseleave', (e)=>{
            isOver = false;
            product.style.height = '350px';
            product.style.zIndex = '0';
            this.changeFavIconVisibility();
            document.getElementById(`product-image-${this.uniqid}`).style.height = '200px';
            document.getElementById(`product-btn-add-cart-container-${this.uniqid}`).remove();
        });
    }

    /**
     * Function to add or remove from favorites
     * @param {*} cb When the product is add to favorites execute the callback fucntion with variable to check if is favorite
     */
    changeFavorite(cb){
        const favIcon = document.getElementById(`product-fav-icon-${this.uniqid}`);
        if(this.favourite){
            User.removeFavorite(this.id, ()=>{
                favIcon.querySelector('img').src = './resources/images/icons/heart_filled.png';
                this.favourite = false;
                if(cb) cb(this.favourite);
            });
        }else{
            User.addFavorite(this.getProductInfo(), ()=>{
                favIcon.querySelector('img').src = './resources/images/icons/heart_filled_red.png';
                this.favourite = true;
                if(cb) cb(this.favourite);
            });
        }
    }

    changeFavIconVisibility(){
        const favIcon = document.getElementById(`product-fav-icon-${this.uniqid}`);
        if(favIcon.style.visibility == 'hidden'){
            favIcon.style.visibility = 'visible';
        }else{
            favIcon.style.visibility = 'hidden';
        }
    }

    renderProductAddCartBtn(){
        return(
            `<div id="product-btn-add-cart-container-${this.uniqid}" class="product-add-cart-container">`+
                `<button id="product-btn-add-cart-${this.uniqid}">`+
                    '<strong>Añadir a la cesta</strong>'+
                '</button>'+
            '</div>'
        )
    }

    render(){
        return(
            `<div id="product-${this.uniqid}" class="product">`+
                '<div class="product-offert">'+
                    '<div class="product-is-offert">'+
                    `${(this.discount) ? (
                        '<div class="product-offert-icon">'+
                            `<span><strong+>- ${this.discountPer*-1}%</strong></span>`+
                            `<span><strong>${this.discountUni}</strong></span>`+
                        '</div>'
                    ):''}`+
                    '</div>'+
                    '<div class="product-fav">'+
                        `<div style="visibility: hidden;" id="product-fav-icon-${this.uniqid}" class="product-fav-icon">`+
                            `<img src="./resources/images/icons/${this.favourite?'heart_filled_red':'heart_filled'}.png">`+
                        '</div>'+
                    '</div>'+
                '</div>'+
                `<div id="product-image-${this.uniqid}" class="product-image">`+
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
