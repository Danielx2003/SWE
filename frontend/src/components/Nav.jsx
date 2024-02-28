import React, {useState} from 'react';
import Cookies from 'js-cookie';

export default function Nav() {
    const [text, setText] = useState("")

    return (
        <nav class="navbar navbar-fixed-top">
            <div class="nav-container">
                <div class="nav-group">
                    <a class="navbar-text-logo" href="/">Garden App</a>
                </div>
                <div class="nav-group">
                    <a class="nav-group-element" href="/login">Login</a>
                </div>
            </div>
        </nav>
    )

}