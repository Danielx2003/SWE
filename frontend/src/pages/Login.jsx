import {React, useState} from 'react';
import CookieConsent, { Cookies } from "react-cookie-consent";
import LoginComp from '../components/LoginComp';
import RegisterComp from '../components/RegisterComp';

export default function Login(props) {
    const [authState, setAuthState] = useState(false);

    function toggleAuthStateL() {
        setAuthState(false)
    }
    function toggleAuthStateR() {
        setAuthState(true)
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <div id="auth-buttons" className="auth-button-controller d-flex w-100 flex-row">
                    <a id="left-auth" onClick={() => toggleAuthStateL(false)} className="auth-button d-flex w-50 justify-content-center border-end"><h4 class="form-title mb-0" style={{fontWeight : !authState ? 'bold' : ""}}>LOGIN</h4></a>
                    <a id="right-auth" onClick={() => toggleAuthStateR(true)} className="auth-button d-flex w-50 justify-content-center"><h4 class="form-title mb-0" style={{fontWeight : authState ? 'bold' : ""}}>REGISTER</h4></a>
                    <label type="hidden"></label>
                </div>
                <hr className="mt-0 mb-4"></hr>

                <section id="auth" className='d-flex h-100 align-items-center'>
                    {!authState ? <LoginComp redirectQR={props.redirectQR}/> : <RegisterComp redirectQR={props.redirectQR}/>}
                </section>
            </div>

            <CookieConsent>
                By proceeding with your registration on our website, you are consenting to the use of cookies to enhance your browsing experience. 
                You may manage your cookie preferences in your browser settings.
            </CookieConsent>
        </div>
    )
}