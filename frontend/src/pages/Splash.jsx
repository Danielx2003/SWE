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
                <h1 id="h1--override">Welcome</h1>
                <p id="p--override">Stuff</p>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleClick}
                    id="btn--override"
                >Sign in</button>

            </div>
        </div>

    )
}