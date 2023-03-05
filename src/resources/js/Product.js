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
        this.favourite = product.favourite;
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
                };
                if(node.id && node.id.startsWith('product-btn-add-cart-')){
                    User.addCart(this.getProductInfo(), 1);
                    ModalCart.render();
                    alert(`(1) '${this.title}' Añadido al carrito`);
                    return;
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
            product.innerHTML = product.innerHTML + this.renderProductButton();
            //addProcutClick();
            /*
            document.getElementById(`product-btn-add-cart-${this.id}`).addEventListener('click', ()=>{
                console.log("aa");
            });
            */
            isOver = true;
        });
        product.addEventListener('mouseleave', (e)=>{
            isOver = false;
            product.style.height = '350px';
            product.style.zIndex = '0';
            document.getElementById(`product-btn-add-cart-container-${this.id}`).remove();
            //addProcutClick();
        });
    }

    renderProductButton(){
        return(
            `<div id="product-btn-add-cart-container-${this.id}" class="product-add-cart-container">`+
                `<button id="product-btn-add-cart-${this.id}">`+
                    '<div>'+
                        '<img src="./resources/images/icons/cesta-de-la-compra.png" alt="">'+
                    '</div>'+
                    '<strong>Añadir a la cesta</strong>'+
                '</button>'+
            '</div>'
        )
    }

    renderToModal(){
        ModalProduct.changeInfo(this.getProductInfo());
    }

    renderToGrilla(){
        return(
            `<div id="product-${this.id}" class="product">`+
            '    <div class="product-offert">'+
            '    </div>'+
            `    <div id="product-image-${this.id}" class="product-image">`+
            `        <img src="./resources/images/products/${this.id}.jpg" alt="">`+
            '    </div>'+
            '    <div class="product-name">'+
            `        <span><strong>${this.title}</strong></span>`+
            '    </div>'+
            '    <div class="product-description">'+
            '        <div class="product-desc-cant">'+
            `            <span>${this.amount}</span>`+
            '        </div>'+
            '        <div class="product-desc">'+
            `            <span>Natura</span>`+
            '        </div>'+
            '    </div>'+
            '    <div class="product-price">'+
            `        <strong><span>${this.price} €</span></strong>`+
            '    </div>'+
            '</div>'
        )
    }

}

export default Product;
