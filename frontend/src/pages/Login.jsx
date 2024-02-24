import React, { useState, useEffect} from 'react';

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [btnPressed, setBtnPressed] = useState(false)

    useEffect(() => {
        /*
        on the login page
        need to POST username and password 
        see if the details match those in the db
        if so login
        else display an error
        */
        const makeReq = async () => {
            const response = await fetch('authentication/login/', {
                method: "POST",
                body: JSON.stringify({
                    username:"Hot_Plazma",
                    password:"codepeople"
                }),
                headers: {
                  "Content-type": "application/json"
                }
            })
            const json = await response.json()
            console.log(json)
        }
        makeReq()
    }, [btnPressed])   

    function handleClick(e) {
        e.preventDefault()
        if (!btnPressed) {
            alert("will make the request now")
        }
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }


    return (
        <div className="login-container">
            <div className="form-container">
                <form className="" action="POST">
                    <h4 className="form-title">LOGIN</h4>
                    <div clclassNameass="form-group">
                        <label for="uname" id="label--login">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            id="uname"
                            value={username}
                            onChange={handleUsername}
                            placeholder="Enter username here..." />
                    </div>
                    <div className="form-group">
                        <label for="password" id="label--login">Password</label>
                        <input
                            className="form-control"
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="Enter password here..." />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="remember" value="" placeholder="Enter password here..." />
                        <label className="form-check-label pl-2 mb-3" for="remember" id="label--login">Remember me?</label>
                    </div>
                    <button
                        className="btn btn-login"
                        type="submit"
                        id="btn--override"
                        onClick={handleClick}
                    >LOGIN</button>
                    <small className="float-right mt-2"><a class="text-muted mt-3" href="/forgot">Forgotten your password?</a></small>
                </form>
                <hr />
                <span className="text-center">Need an account? <strong><a class="text-capitalize" id="a--login">SIGN UP</a></strong></span>
            </div>
        </div>

    )
}