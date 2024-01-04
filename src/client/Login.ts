
import LibConfig from './lib/LibConfig';
import LibCookie from './lib/LibCookie';
console.log("#Login");
//
const Login = {
    /**
     *
     * @param key: any
     *
     * @return
     */  
    loginProc : async function() : Promise<any>
    {
        try{
            const name = import.meta.env.VITE_USER_NAME;
            const pass = import.meta.env.VITE_USER_PASSWORD;
//console.log(name);
//console.log(pass);
            let ret = false;
            const password = document.querySelector<HTMLInputElement>('#password');
            let passwordValue = "";
            let emailValue = "";
            if(password) { passwordValue = password?.value; }
            const email = document.querySelector<HTMLInputElement>('#email');
            if(email) { emailValue = email?.value; }
            if(pass === passwordValue && name === emailValue
            ){
                const key = LibConfig.COOKIE_KEY_AUTH;  
                await LibCookie.set_cookie(key, name);
                location.href = '/';
            }else{
                alert("Error, login");
            }
            //console.log("passwordValue=", passwordValue);
            //console.log("Success, auth");
        } catch (e) {
            console.error(e);
            throw new Error('Error , login');
        }
    },  
    /**
     *
     * @param key: any
     *
     * @return
     */  
    startProc : async function() : Promise<any>
    {
        //console.log("#Layout.startProc");
        //btn
        const button: any = document.querySelector('#btn_login');
        button.addEventListener('click', () => {
            this.loginProc();
        });  

    }
}
Login.startProc();

export default Login;
