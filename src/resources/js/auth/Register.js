import User from "../User.js";


class Register{

    constructor(){
        // Form input and buttons
        this.form = document.getElementById("register");
        this.firstNameInput = document.getElementById("register-input-name");
        this.lastNameInput = document.getElementById("register-input-last-name");
        this.emailInput = document.getElementById("register-input-email");
        this.passwordInput = document.getElementById("register-input-password");
        this.confirmPasswordInput = document.getElementById("register-input-confirm-password");
        this.registerBtn = document.getElementById("register-btn-register");
        this.registerWithFacebookBtn = document.getElementById("register-btn-register-faceboo");
        this.passwordReq = document.getElementById("register-password-info");
        this.addListener();
    }
    /**
     * Function to add event listeners
     */
    addListener(){
        // Execute User register function and check inputs requeriments
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if(this.passwordInput.value!==this.confirmPasswordInput.value){
                return alert('Invalid password');
            }else{
                let isSecure = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.passwordInput.value);
                if(!isSecure){
                    alert("La contraseña debe tener minimo 8 caracateres por lo menos 1 letra mayuscula, 1 letra miniscula, 1 numero y 1 simbolo");
                    return;
                }
            }
            var result = User.register(this.firstNameInput.value, this.lastNameInput.value, this.emailInput.value, this.passwordInput.value);
            if(result.status){
                window.location.href = 'home.html';
            }else{
                alert(result.message);
            }
        });
    }

}

const register = new Register();
export default register;