import {React, useState} from 'react';
import LoginComp from '../components/LoginComp';
import RegisterComp from '../components/RegisterComp';

export default function Login() {
    const [authState, setAuthState] = useState(true);

    function toggleAuthStateL() {
        setAuthState(false)
    }

    function toggleAuthStateR() {
        setAuthState(true)
    }

    return (
        <div class="login-container">
            <div class="form-container">
                <div id="auth-buttons" class="auth-button-controller d-flex w-100 flex-row">
                    <a id="left-auth" onClick={() => toggleAuthStateL(false)} class="auth-button d-flex w-50 justify-content-center border-end"><h4 class="form-title mb-0">LOGIN</h4></a>
                    <a id="right-auth" onClick={() => toggleAuthStateR(true)} class="auth-button d-flex w-50 justify-content-center"><h4 class="form-title mb-0">REGISTER</h4></a>
                    <label type="hidden"></label>
                </div>
                <hr class="mt-0 mb-4"></hr>

                <section id="auth">
                    {!authState ? <LoginComp/> : <RegisterComp/>}
                </section>
            </div>
        </div>
    )
}