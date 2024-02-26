import React, {useState, useEffect} from 'react';

export default function LoginComp() {
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
            // POST username and password
            const response = await fetch('authentication/login/', {
                method: "POST",
                body: JSON.stringify({
                    username: {username},
                    password: {password}
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