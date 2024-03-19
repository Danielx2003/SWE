import {React, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import { IPContext } from "../App.js"


export default function RegisterComp(props) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordChk, setpasswordChk] = useState("")
    let navigate = useNavigate()
    const IP = useContext(IPContext)

    function handleFormSubmit(e) {
        e.preventDefault()
        const makeReq = async () => {
            // POST username and password
            const response = await fetch(`http://${IP}:8000/authentication/register/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email
                })
            })
            const json = await response.json()
            if (response.ok) {
                loginReq()                
            } else {
                let errorMsg = ""
                for (const [key, value] of Object.entries(json)) {
                    errorMsg += value + "\n"
                    }
                if (password != passwordChk) {
                    errorMsg += "Passwords must match. \n"
                }
                alert(errorMsg)
            }
        }
        const loginReq = async () => {
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
        
        makeReq()        

    }
    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handlePasswordChk(e) {
        setpasswordChk(e.target.value);
    }

    return (
        <form className="" action="POST">
            <div className="mb-3">
                <label for="uname">Username</label>
                <input 
                    className="form-control" 
                    type="text" 
                    id="uname" 
                    value={username}
                    onChange={handleUsername}
                    placeholder="Enter username here..." />
            </div>

            <div className="mb-3">
                <label for="email">Email</label>
                <input 
                className="form-control" 
                type="text" 
                id="uname" 
                value={email}
                placeholder="Email address here..."
                onChange={handleEmail}
                />
            </div>

            <div className="form-group">
                <label for="password">Password</label>
                <input 
                className="form-control" 
                type="password" 
                id="password" 
                value={password} 
                placeholder="Enter password here..."
                onChange={handlePassword}
                />
                <input 
                className="form-control" 
                type="password" 
                id="password" 
                value={passwordChk}
                placeholder="Re-enter your password here..."
                onChange={handlePasswordChk}
                />
            </div>
            <button 
            className="btn btn-login" 
            type="submit"
            onClick={handleFormSubmit}
            >REGISTER</button>
        </form>
    )
}