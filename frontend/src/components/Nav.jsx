import React, {useEffect, useState, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'

import Logout from '../pages/Logout';

import { IPContext } from "../App.js"


export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [group, setGroup] = useState([])
    const location = useLocation()
    const IP = useContext(IPContext)

    // When app is rendered, if username cookie does not exist, fetch it
    useEffect(() => {
        const getUsername = async () => {
            const response = await axios.get(
                `http://${IP}:8000/authentication/user/`,
                {'withCredentials': true}
            )
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                
                Cookies.set('username', data.username)
                flipLoggedIn(true)

                setGroup(data.groups)
                console.log(data.groups)
            })
            .catch((e) => console.log("User not authenticated."))
        }

        // const USERNAME_COOKIE_EXISTS = Cookies.get('username') != undefined
        getUsername()
        
    }, [])

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
                            {
                                (group.includes('admin') || group.includes('game_master')) ?
                                <>
                                    <a className="nav-group-element" href="/admin">Admin</a>
                                </>
                                :
                                <>
                                
                                </>
                            }
                            <a className="nav-group-element" href="/friends" style={{fontWeight : location.pathname == "/friends" ? "bold" : "normal"}} >Friends</a>
                            <a className="nav-group-element" href="/leaderboard" style={{fontWeight : location.pathname == "/leaderboard" ? "bold" : "normal"}}>Leaderboard</a>
                            <Logout/>
                        </div>
                    </>
                }
            </div>
        </nav>
    )

}