import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Completed from "../components/Completed"
import Challenges from "../components/Challenges"

export default function Main() {
    const [authState, setAuthState] = useState(false);

    function toggleAuthStateL() {
        setAuthState(false)
    }

    function toggleAuthStateR() {
        setAuthState(true)
    }

    useEffect(() => {
        /*
        on the main page for the user
        need to add the garden image
        need to request their data and dispaly (garden, level etc)
        */
    }, [])    
    
    return (
        <div className="main--container">
            <img className="garden--img" src="https://i0.wp.com/fuentespens.ink/wp-content/uploads/2020/04/IMG_5412.jpeg?w=828&ssl=1"></img>
            <div className="garden--container">
                <div className="choice--container">
                    <div id="auth-buttons" class="auth-button-controller d-flex w-100 flex-row">
                        <a id="left-auth" onClick={() => toggleAuthStateL(false)} class="auth-button d-flex w-50 justify-content-center border-end"><h4 class="form-title mb-0">Challenges</h4></a>
                        <a id="right-auth" onClick={() => toggleAuthStateR(true)} class="auth-button d-flex w-50 justify-content-center"><h4 class="form-title mb-0">Completed</h4></a>
                        <label type="hidden"></label>
                    </div>
                    <hr class="mt-0 mb-4"></hr>
                    <section id="auth">
                        {!authState ? <Challenges/> : <Completed/>}
                    </section>
                </div>
            </div>
        </div>

    )
}