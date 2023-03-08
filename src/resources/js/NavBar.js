
import modalAccount from "./modals/ModalAccount.js";
import modalCart from "./modals/ModalCart.js";
import User from "./User.js";
var Filter = null;
import("./Filter.js")
  .then((filter) => {
    Filter = filter.default;
  }).catch(()=>{});

class NavBar {

    constructor(){
        this.searchInput = document.getElementById("search-input");
        this.btnFavorites = document.getElementById("navbar-btn-fav");
        this.btnAccount = document.getElementById("navbar-btn-account");
        this.btnCart = document.getElementById("navbar-btn-cart");
        this.btnHome = document.getElementById("navbar-btn-home");

        this.navbarCartAmount = document.getElementById("navbar-cart-amount");
        this.searchInputForm = document.getElementById("search-form"); 
        this.getParams();
        this.addListener();
        this.render();
    }

    /**
     * Function to add listeners
     */
    addListener(){
        // When submit search the products with the product name and filters if exits
        this.searchInputForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const search = this.searchInput.value;
            if(Filter){
                const priceFrom = Filter.filterFrom.value;
                const priceTo = Filter.filterTo.value;
                window.location.href = `home.html?search=${search}&priceFrom=${priceFrom}&priceTo=${priceTo}`;
            }else{
                window.location.href = `home.html?search=${search}`;
            }
        });
        // Button favorites
        this.btnFavorites.addEventListener('click', (e)=>{
            console.log("favorites");
        });
        // Show account modal and hidde other modals
        this.btnAccount.addEventListener('click', (e)=>{
            modalAccount.changeVisibilty();
            modalCart.changeVisibilty(false);
        });
        // Show cart modal and hidde other modals
        this.btnCart.addEventListener('click', (e)=>{
            modalCart.changeVisibilty();
            modalAccount.changeVisibilty(false);
        });
        // Go to home
        this.btnHome.addEventListener('click', (e)=>{
            window.location.href = "home.html";
        });
    }
    
    /**
     * Get url params and check if exits 'search' param
     */
    getParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const search = params.search;
        this.searchInput.value = search || '';
    }

    /**
     * Render cart amount of products in the cart
     */
    render(){
        var amount = 0;
        Object.values(User.getCart()).forEach(item=>{
            amount += item.amount;
        });
        if(amount==0){
            this.navbarCartAmount.style.visibility = 'hidden';
        }else if(amount>99){
            this.navbarCartAmount.style.visibility = 'visible';
            this.navbarCartAmount.style.fontSize = '12px';
            this.navbarCartAmount.innerHTML = '+99';
        }else{
            this.navbarCartAmount.style.visibility = 'visible';
            this.navbarCartAmount.style.fontSize = '13px';
            this.navbarCartAmount.innerHTML = amount;
        }
    }
}

const navbar = new NavBar();
export default navbar;
