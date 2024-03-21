import React from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export default function Splash() {
    let navigate = useNavigate()
    function handleClick(e) {
        navigate('login')
    }

    return (
        <div className="jumbotron">
            <div className="jumbotron-container">
                <h1 style={{textAlign: 'center'}}>Welcome</h1>
                {
                    (Cookies.get('username') === undefined) ?
                    <>
                <div
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                >Sign in</div>
                </>
                :
                <>
                <div
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                >Enter profile</div>
                </>
                }
            </div>
        </div>

    )
}