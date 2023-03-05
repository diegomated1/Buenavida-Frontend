
import modalCart from "./ModalCart.js";

class NavBar {

    constructor(){
        this.searchInput = document.getElementById("search-input");
        this.btnFavorites = document.getElementById("navbar-btn-fav");
        this.btnAccount = document.getElementById("navbar-btn-account");
        this.btnCart = document.getElementById("navbar-btn-cart");
        this.btnHome = document.getElementById("navbar-btn-home");
        this.addListener();
    }

    addListener(){
        this.searchInput.addEventListener('click', (e)=>{
            console.log("input");
        });
        this.btnFavorites.addEventListener('click', (e)=>{
            console.log("favorites");
        });
        this.btnAccount.addEventListener('click', (e)=>{
            console.log("account");
        });
        this.btnCart.addEventListener('click', (e)=>{
            modalCart.changeVisibilty();
        });
        this.btnHome.addEventListener('click', (e)=>{
            console.log("home");
        });
    }

}

let navbar = new NavBar();
export default navbar;
