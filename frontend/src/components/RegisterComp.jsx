import {React, useState} from 'react';

export default function RegisterComp() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordChk, setpasswordChk] = useState("")

    function handleFormSubmit() {
        if (password != passwordChk) alert("Invalid password.")
        else {
            // TODO: Add form submission functionality for registering new users
        }
    }

    return (
        <form class="" action="POST">
            <div class="mb-3">
                <label for="uname">Username</label>
                <input 
                    class="form-control" 
                    type="text" 
                    id="uname" 
                    value={username}
                    placeholder="Enter username here..." />
            </div>

            <div class="mb-3">
                <label for="uname">Email</label>
                <input class="form-control" type="text" id="uname" value={email} placeholder="Email address here..."/>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input class="form-control" type="password" id="password" value={password} placeholder="Enter password here..."/>
                <input class="form-control" type="password" id="password" value={passwordChk} placeholder="Re-enter your password here..."/>
            </div>
            <button class="btn btn-login" type="submit">LOGIN</button>
        </form>
    )
}