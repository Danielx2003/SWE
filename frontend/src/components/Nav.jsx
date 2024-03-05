import React, {useEffect, useState, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'

import Logout from '../pages/Logout';

import { IPContext } from "../App.js"


export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false)
    const location = useLocation()
    const IP = useContext(IPContext)

    // All pages that require superuser access.
    // Any page included in here will redirect to the root if unauthenticated.
    const AUTHENTICATED_PAGES = [
        '/admin',
        '/admin/create'
    ]

    // When app is rendered, if username cookie does not exist, fetch it
    useEffect(() => {
        const getUsername = async () => {
            const response = await axios.get(
                `http://${IP}:8000/authentication/user/`,
                {'withCredentials': true}
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.username) {
                    Cookies.set('username', data.username)
                    flipLoggedIn(true)
                }
            })
            .catch (
                () => console.log("User not logged in.")
            )
        }

        console.log(location)
        const USERNAME_COOKIE_EXISTS = Cookies.get('username') != undefined
        if (!USERNAME_COOKIE_EXISTS) {
            getUsername()
        }
    }, [loggedIn])

    function flipLoggedIn(e) {
        setLoggedIn(prev => !prev)
    } 

    return (
        <nav className="navbar navbar-fixed-top">
            <div className="nav-container">
                <div className="nav-group">
                    <a className="navbar-text-logo" href="/">Garden App</a>
                </div>
                {
                    // Wait until name has been loaded before rendering this
                    (Cookies.get('username') === undefined) ?
                    // If user is not logged in
                    <>
                        <div className="nav-group">
                            <a className="nav-group-element" href="/login">Login</a>
                        </div>
                    </>
                    :
                    <>
                        <div className="nav-group">
                            <a className="nav-group-element" href="/main">Welcome, {Cookies.get('username')}!</a>
                            <Logout/>
                        </div>
                    </>
                }
            </div>
        </nav>
    )

}