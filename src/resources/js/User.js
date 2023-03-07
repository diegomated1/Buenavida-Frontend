

class User{

    constructor(){
        this.isLogged = false;
        this.favorites = {};
        this.cart = {};
        this.user = {};
        this.loadData();
    }

    loadData(){
        const userInfo = localStorage.getItem('user');
        if(userInfo){
            this.isLogged = true;
            this.user = JSON.parse(userInfo);
        }else{
            this.isLogged = false;
            return;
        }
        const favorites = localStorage.getItem('favorites');
        const cart = localStorage.getItem('cart');
        if(favorites){
            let _favorites = JSON.parse(favorites);
            if(!_favorites[this.user.email]){
                _favorites[this.user.email] = {};
            }
            this.favorites = _favorites;
            localStorage.setItem('favorites', JSON.stringify(_favorites));
        }else{
            localStorage.setItem('favorites',`{"${this.user.email}":{}}`);
        }
        if(cart){
            let _cart = JSON.parse(cart);
            if(!_cart[this.user.email]){
                _cart[this.user.email] = {};
            }
            this._cart = _cart;
            localStorage.setItem('cart', JSON.stringify(_cart));
        }else{
            localStorage.setItem('cart',`{"${this.user.email}":{}}`);
        }
    }

    addCart(product, amount, cb){
        if(this.isLogged){
            if(this.cart[this.user.email][product.id]){
                this.cart[this.user.email][product.id].amount += amount;
            }else{
                this.cart[this.user.email][product.id] = {product, amount};
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            cb(this.cart[this.user.email][product.id].amount);
        }else{
            alert('No logged');
        }
    }

    delCart(id, amount, cb){
        if(this.isLogged){
            if(this.cart[this.user.email][id].amount == 1){
                delete this.cart[this.user.email][id];
            }else{
                this.cart[this.user.email][id].amount -= amount;
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
            cb(this.cart[this.user.email][id].amount);
        }else{
            alert('No logged');
        }
    }

    removeProductCart(id, cb){
        if(this.isLogged){
            delete this.cart[this.user.email][id];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            cb();
        }else{
            alert('No logged');
        }
    }

    addFavorite(product, cb){
        if(this.isLogged){
            this.favorites[this.user.email][product.id] = product;
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            cb();
        }else{
            alert('No logged');
        }
    }

    removeFavorite(id){
        if(this.isLogged){
            delete this.favorites[this.user.email][id];
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            cb();
        }else{
            alert('No logged');
        }
    }

    login(email, password){
        var users = JSON.parse(localStorage.getItem('users'));
        if(!users || users[email]===undefined){
            return{
                status: false,
                message: 'User not found'
            }
        }else if(users[email].password !== password){
            return{
                status: false,
                message: 'Invalid password'
            }
        }else{
            localStorage.setItem('user', JSON.stringify({...users[email], email}));
            this.loadData();
            return{
                status: true
            }
        }
    }

    register(firstName, lastName, email, password){
        var users = JSON.parse(localStorage.getItem('users'));
        if(users && users[email]!==undefined){
            return{
                status: false,
                message: 'Email already taken'
            }
        }else{
            if(!users){
                users = {};
            }
            users[email] = {firstName, lastName, password};
            localStorage.setItem('users', JSON.stringify(users));
            return{
                status: true
            }
        }
    }

}

export default new User();
