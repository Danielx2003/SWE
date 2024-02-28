import React, {useState} from 'react';

export default function Nav({isLoggedIn, username}) {
    return (
        <nav class="navbar navbar-fixed-top">
            <div class="nav-container">
                <div class="nav-group">
                    <a class="navbar-text-logo" href="/">Garden App</a>
                </div>
                {
                    (!isLoggedIn) ?
                    // If user is not logged in
                    <>
                        <div class="nav-group">
                            <a class="nav-group-element" href="/login">Login</a>
                        </div>
                    </>
                    :
                    <>
                        <div class="nav-group">
                            <a class="nav-group-element" href="/main">Welcome, {username}!</a>
                        </div>
                    </>
                }
                
            </div>
        </nav>
    )

}