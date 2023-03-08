import User from "../User.js";


class Login{

    constructor(){
        // Form inputs and buttons
        this.form = document.getElementById("login");
        this.emailInput = document.getElementById("login-input-email");
        this.passwordInput = document.getElementById("login-input-password");
        this.loginBtn = document.getElementById("login-btn-login");
        this.loginWithFacebookBtn = document.getElementById("login-btn-login-faceboo");
        this.addListener();
    }
    /**
     * Function to add event listeners
     */
    addListener(){
        // Execute User login function, if is logged go to home.html
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            var result = User.login(this.emailInput.value, this.passwordInput.value);
            if(result.status){
                window.location.href = 'home.html';
            }else{
                alert(result.message);
            }
        });
    }

}

const login = new Login();
export default login;