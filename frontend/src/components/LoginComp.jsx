import React, {useState, useEffect, useContext} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { IPContext } from "../App.js"


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
        const makeReq = async () => {
            const response = await fetch(`http://${IPContext}:8000/authentication/login/`, {
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
            .catch((err) => alert("Something went wrong, please try again."))

            if (response.status == 200) {
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
    }, [btnPressed])    

    function handleClick(e) {
        e.preventDefault()
        setBtnPressed(prev => !prev)
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <form class="" action="POST">
            <div class="form-group">
                <label for="uname">Username</label>
                <input
                    class="form-control"
                    type="text"
                    id="uname"
                    value={username}
                    onChange={handleUsername}
                    placeholder="Enter username or email here..." />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input
                    class="form-control"
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter password here..." />
            </div>
            <div class="form-check">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="remember"
                    value="" />
                <label class="form-check-label pl-2 mb-3" for="remember">
                    Remember me?
                </label>
            </div>
            <button class="btn btn-login" 
                    type="submit"
                    onClick={handleClick}>LOGIN</button>
            <small class="float-end mt-2">
                <a class="text-muted mt-3" href="/forgot">
                    Forgotten your password?
                </a>
            </small>
        </form>
    )
}