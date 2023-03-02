import Modal from "./Modal.js";

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
        let a = this;
        document.getElementById(`product-${this.id}`).addEventListener('click', function(){
            Modal.changeVisibilty();
            Modal.changeInfo(a.getProductInfo());
        });
    }

    renderToModal(){
        Modal.changeInfo(this.getProductInfo());
    }

    renderToGrilla(){
        return(
            `<div id="product-${this.id}" class="product">`+
            '    <div class="product-offert">'+
            '    </div>'+
            '    <div class="product-image">'+
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
