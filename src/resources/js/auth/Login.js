import User from "../User.js";


class Login{

    constructor(){
        this.form = document.getElementById("login");
        this.emailInput = document.getElementById("login-input-email");
        this.passwordInput = document.getElementById("login-input-password");
        this.loginBtn = document.getElementById("login-btn-login");
        this.loginWithFacebookBtn = document.getElementById("login-btn-login-faceboo");
        this.addListener();
    }

    addListener(){
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