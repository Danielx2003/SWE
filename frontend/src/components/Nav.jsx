import React from 'react';

export default function Nav() {
    return (
        <nav class="navbar navbar-fixed-top">
            <div class="nav-container">
                <div class="nav-group">
                    <a class="navbar-text-logo" id="a--nav" href="/">Garden App</a>
                </div>
                <div class="nav-group">
                    <a class="nav-group-element" id="a--nav" href="/login">Login</a>
                    <a class="" id="a--nav">Register</a>
                </div>
            </div>
        </nav>
    )

}