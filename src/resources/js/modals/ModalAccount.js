

class ModalAccount{

    constructor(){
        this.modal = document.getElementById("modal-user-account");
        this.btnAccount = document.getElementById("mua-btn-account");
        this.btnFav = document.getElementById("mua-btn-fav");
        this.btnCart = document.getElementById("mua-btn-cart");
        this.btnLogin = document.getElementById("mua-btn-login");
        this.btnRegister = document.getElementById("mua-btn-register");
        this.modal.style.visibility = 'hidden';
        this.visibility = false;
        this.addListener();
    }
    /**
     * change the visibility of the modal
     * @param {*} visible param for change visibility manually 
     */
    changeVisibilty(visible){
        if(visible!=undefined){
            this.visibility = visible;
            this.modal.style.visibility = visible ? 'visible' : 'hidden';
        }else if(this.visibility){
            this.visibility = false;
            this.modal.style.visibility = 'hidden';
        }else{
            this.visibility = true;
            this.modal.style.visibility = 'visible';
        }
    }
    /**
     * Function to add event listeners
     */
    addListener(){
        this.btnAccount.addEventListener('click', (e)=>{
            console.log('Mi cuenta');
        });
        this.btnFav.addEventListener('click', (e)=>{
            console.log('Mi Favs');
        });
        this.btnCart.addEventListener('click', (e)=>{
            window.location.href = 'cart.html';
        });
        this.btnLogin.addEventListener('click', (e)=>{
            window.location.href = 'login.html';
        });
        this.btnRegister.addEventListener('click', (e)=>{
            window.location.href = 'register.html';
        });
    }

}

const modalAccount = new ModalAccount();

export default modalAccount;