import {React, useState} from 'react';
import Cookies from 'js-cookie';

export default function RegisterComp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordChk, setpasswordChk] = useState("")

    function handleFormSubmit(e) {
        e.preventDefault()
        if (password != passwordChk) {
            alert("Invalid password.")
        }
        else {
            const makeReq = async () => {
                // POST username and password
                debugger;
                const response = await fetch('http://localhost:8000/authentication/register/', {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    })
                })
                console.log(username, password, email)
                const json = await response.json()
                console.log(json)
            }
    
            makeReq()        
        }

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