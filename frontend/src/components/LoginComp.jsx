import React, {useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { IPContext } from "../App.js"

// A component to allow users to log in to the website.
export default function LoginComp(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [btnPressed, setBtnPressed] = useState(false)
    const [count, setCount] = useState(0)
    let navigate = useNavigate()
    const IP = useContext(IPContext)

    if (Cookies.get('sessionid')) {
        navigate('/main')
    }

    useEffect(() => {
        // Login request to API
        const makeReq = async () => {
            const response = await fetch(`http://${IP}:8000/authentication/login/`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  'X-CSRFToken' : Cookies.get('csrftoken')
                },
                credentials: "include",
                body: JSON.stringify({
                    username:username,
                    password:password
                }),
            })
            .catch((err) => {
                alert("Something went wrong, please try again.")
                console.log(response.json())
            })

            if (response.ok) {
                Cookies.set('username', username)
                if (props.redirectQR.qr) {                    
                    navigate(props.redirectQR.path)
                } else {
                    navigate('/main')
                }
            } else {
                alert("Incorrect Username or Password.")
            }
        }
        if (count != 0) {
            makeReq()
        } else {
            setCount(prev => prev+1);
        }
    }, [btnPressed]) // Login whenever button is pressed

    function handleClick(e) {
        e.preventDefault() // To override typical click behaviour
        setBtnPressed(prev => !prev)
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <form className="d-flex justify-content-center w-100 flex-column" action="POST">
            <div className="form-group">
                <label for="uname">Username</label>
                <input
                    className="form-control"
                    type="text"
                    id="uname"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Enter username or email here..." />
            </div>
            <div className="form-group">
                <label for="password">Password</label>
                <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter password here..." />
            </div>
            <button className="btn btn-login" 
                    type="submit"
                    onClick={handleClick}>LOGIN</button>
        </form>
    )
}