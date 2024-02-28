import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Splash() {
    let navigate = useNavigate()
    function handleClick(e) {
        navigate('login')
    }

    return (
        <div className="jumbotron">
            <div className="jumbotron-container">
                <h1>Welcome</h1>
                <div
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                >Sign in</div>

            </div>
        </div>

    )
}