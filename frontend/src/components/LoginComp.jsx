import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export default function LoginComp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [btnPressed, setBtnPressed] = useState(false)
    const [count, setCount] = useState(0)
    let navigate = useNavigate()
    useEffect(() => {
        /*
        on the login page
        need to POST username and password 
        see if the details match those in the db
        if so login
        else display an error
        */
        const makeReq = async () => {
            const response = await fetch('http://localhost:8000/authentication/login/', {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  'X-CSRFToken' : Cookies.get('csrftoken')
                },
                body: JSON.stringify({
                    username:username,
                    password:password
                }),
            })
            console.log(username, password)
            if (response.status == 200) {
                navigate('main')
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
                <a class="text-muted mt-3" href="">
                    Forgotten your password?
                </a>
            </small>
        </form>
    )
}