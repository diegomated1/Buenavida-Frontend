
import modalAccount from "./modals/ModalAccount.js";
import modalCart from "./modals/ModalCart.js";
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

        this.searchInputForm = document.getElementById("search-form"); 
        this.getParams();
        this.addListener();
    }

    addListener(){
        this.searchInputForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            const search = this.searchInput.value;
            if(Filter){
                const priceFrom = Filter.filterFrom.value;
                const priceTo = Filter.filterTO.value;
                window.location.href = `home.html?search=${search}&priceFrom=${priceFrom}&priceTo=${priceTo}`;
            }else{
                window.location.href = `home.html?search=${search}`;
            }
        });
        this.btnFavorites.addEventListener('click', (e)=>{
            console.log("favorites");
        });
        this.btnAccount.addEventListener('click', (e)=>{
            modalAccount.changeVisibilty();
            modalCart.changeVisibilty(false);
        });
        this.btnCart.addEventListener('click', (e)=>{
            modalCart.changeVisibilty();
            modalAccount.changeVisibilty(false);
        });
        this.btnHome.addEventListener('click', (e)=>{
            window.location.href = "home.html";
        });
    }
    
    getParams(){
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const search = params.search;
        this.searchInput.value = search || '';
    }
}

const navbar = new NavBar();
export default navbar;
