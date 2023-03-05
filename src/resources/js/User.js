

class User{

    constructor(){
        this.favorites = {};
        this.cart = {};
        this.loadData();
    }

    loadData(){
        const favorites = localStorage.getItem('favorites');
        const cart = localStorage.getItem('cart');
        if(favorites){
            this.favorites = JSON.parse(favorites);
        }else{
            localStorage.setItem('favorites','{}');
        }
        if(cart){
            this.cart = JSON.parse(cart);
        }else{
            localStorage.setItem('favorites','{}');
        }
    }

    addCart(product, amount){
        if(this.cart[product.id]){
            this.cart[product.id].amount += amount;
        }else{
            this.cart[product.id] = {product, amount};
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return this.cart[product.id].amount;
    }

    delCart(id, amount){
        if(this.cart[id].amount == 1){
            delete this.cart[id];
        }else{
            this.cart[id].amount -= amount;
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
        return this.cart[id].amount;
    }

    removeProductCart(id){
        delete this.cart[id];
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addFavorite(product){
        this.favorites[product.id] = product;
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    removeFavorite(id){
        delete this.favorites[id];
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

}

export default new User();
