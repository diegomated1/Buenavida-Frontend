

class User{

    constructor(){
        this.isLogged = false;
        this.favorites = {};
        this.cart = {};
        this.user = {};
        this.loadData();
    }
    /**
     * Verify is user is logged and load all info (cart, favorites and user info)
     */
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
            this.cart = _cart;
            localStorage.setItem('cart', JSON.stringify(_cart));
        }else{
            localStorage.setItem('cart',`{"${this.user.email}":{}}`);
        }
    }

    /**
     * Get user cart if not logged return empty object
     */
    getCart(){
        if(this.isLogged){
            return this.cart[this.user.email];
        }else{
            return {};
        }
    }
    
    /**
     * Get user favorites products if not logged return empty object
     */
    getFavorites(){
        if(this.isLogged){
            return this.favorites[this.user.email];
        }else{
            return {};
        }
    }

    /**
     * Add products to cart
     * @param {*} product product to add cart
     * @param {*} amount amount of the product to add
     * @param {*} cb callback for execute if user is logged
     */
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

    /**
     * Remove products from cart
     * @param {*} id id of the product to remove
     * @param {*} amount amount of the product to remove
     * @param {*} cb callback for execute if user is logged
     */
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

    /**
     * remove all product from cart
     * @param {*} id id of the product to remove
     * @param {*} cb callback for execute if user is logged
     */
    removeProductCart(id, cb){
        if(this.isLogged){
            delete this.cart[this.user.email][id];
            localStorage.setItem('cart', JSON.stringify(this.cart));
            cb();
        }else{
            alert('No logged');
        }
    }

    /**
     * add product to favorites
     * @param {*} product product to add to favorites
     * @param {*} cb callback for execute if user is logged
     */
    addFavorite(product, cb){
        if(this.isLogged){
            this.favorites[this.user.email][product.id] = product;
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            cb();
        }else{
            alert('No logged');
        }
    }

    /**
     * remove product from favorites
     * @param {*} id id of the product to remove from favorites
     * @param {*} cb callback for execute if user is logged
     */
    removeFavorite(id, cb){
        if(this.isLogged){
            delete this.favorites[this.user.email][id];
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
            cb();
        }else{
            alert('No logged');
        }
    }

    /**
     * login
     * @param {*} email email of the user
     * @param {*} password passwor of the user
     * @returns return status and message if not logged
     */
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

    /**
     * register
     * @param {*} firstName first name of the user
     * @param {*} lastName last name of the user
     * @param {*} email email of the user
     * @param {*} password password of the user
     * @returns return status and message if not logged 
     */
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
            localStorage.setItem('user', JSON.stringify({...users[email], email}));
            this.loadData();
            return{
                status: true
            }
        }
    }

}

export default new User();
