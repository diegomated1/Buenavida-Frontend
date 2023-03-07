
import modalAccount from "./modals/ModalAccount.js";
import modalCart from "./modals/ModalCart.js";
import productPages from "./Pages.js";

class NavBar {

    constructor(){
        this.searchInput = document.getElementById("search-input");
        this.btnFavorites = document.getElementById("navbar-btn-fav");
        this.btnAccount = document.getElementById("navbar-btn-account");
        this.btnCart = document.getElementById("navbar-btn-cart");
        this.btnHome = document.getElementById("navbar-btn-home");

        this.searchInputForm = document.getElementById("search-form"); 

        this.addListener();
    }

    addListener(){
        this.searchInputForm.addEventListener('submit', (e)=>{
            e.preventDefault();
            productPages.searchEngine(this.searchInput.value);
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

}

let navbar = new NavBar();
export default navbar;
