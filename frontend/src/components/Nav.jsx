import React, {useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie'
import { FaUserAlt, FaStore, FaGamepad } from 'react-icons/fa';

import Logout from '../pages/Logout';

import { IPContext } from "../App.js"
import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import SettingsModal from './SettingsModal.jsx';

export default function Nav() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [group, setGroup] = useState([])
    const [open, setOpen] = useState(false);

    const Navigate = useNavigate()

    const anchorRef = useRef(null);
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
        
    }, [location.pathname])

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    function navigateToProfile() {
        Navigate('/main')
        setOpen(false);
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function flipLoggedIn(e) {
        setLoggedIn(prev => !prev)
    } 

    return (
        <nav className="navbar navbar-fixed-top">
            <div className="nav-container">
                <div className="nav-group">
                    <a className="navbar-text-logo" href="/">ExeGarden</a>
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
                            {group && !(group.includes('admin') && !group.includes('game_master')) &&
                                <a className="nav-group-element" href="/leaderboard" style={{fontWeight : location.pathname == "/leaderboard" ? "bold" : "normal"}}>Leaderboard</a>
                            }   
                            {(location.pathname == "/main" &&
                                    <a className="nav-group-element" href="/shop"><FaStore /></a>
                            )}
                            {(location.pathname == "/shop" &&
                                    <a className="nav-group-element" href="/main"><FaGamepad /></a>
                            )}
                            
                            <div>
                                {/* User profile icon that leads to a dropdown */}
                                <a 
                                    className="nav-group-element pb-1"
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    style={{fontWeight : location.pathname == "/leaderboard" ? "bold" : "normal"}}
                                    onClick={handleToggle}
                                    >
                                    <FaUserAlt/>
                                </a>
                                {/* User dropdown */}
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                                        }}
                                        >
                                        <Paper>
                                            {(Cookies.get('username') && <h5 style={{textAlign: 'center', paddingTop: '1rem', paddingRight: '2rem', paddingLeft: '2rem'}}>{Cookies.get('username')}</h5>)}
                                            <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList
                                                autoFocusItem={open}
                                                id="composition-menu"
                                                aria-labelledby="composition-button"
                                                onKeyDown={handleListKeyDown}
                                            >
                                                {/* Display this group if the user is not an admin or game master */}
                                                {group && !(group.includes('admin') && !group.includes('game_master')) &&
                                                    <MenuItem className='user-dropdown-link' component={Link} to="/main" onClick={handleClose}>Profile</MenuItem>
                                                }       
                                                {group && !(group.includes('admin') && !group.includes('game_master')) &&
                                                    <MenuItem className='user-dropdown-link' component={Link} to="/friends" onClick={handleClose}>Friends</MenuItem>
                                                }
                                                {group && !(group.includes('admin') && !group.includes('game_master')) &&
                                                <MenuItem className='user-dropdown-link' component={Link} to="/pending-friend-requests" onClick={handleClose}>Pending Friend Requests</MenuItem>
                                                }
                                                <hr></hr> {/* To separate profile actions from game actions */}
                                                <MenuItem className='user-dropdown-link'><SettingsModal user={Cookies.get('username')}/></MenuItem>
                                                {group && (group.includes('admin') || group.includes('game_master')) &&
                                                    <MenuItem className='user-dropdown-link' component={Link} to="/admin" onClick={handleClose}>Admin</MenuItem>
                                                }
                                                <Logout/>
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </div>
                    </>
                }
            </div>
        </nav>
    )

}