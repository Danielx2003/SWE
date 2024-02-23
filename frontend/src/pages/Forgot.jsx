import React, { useState } from 'react';

export default function Forgot() {
    const [username, setUsername] = useState("")

    function handleClick(e) {
        e.preventDefault()
        alert("EMAIL SENT")
    }

    function handleUsername(e) {
        setUsername(e.target.value);
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <form className="" action="POST">
                    <h4 className="form-title">Forgotten Your Password?</h4>
                    <div className="form-group">
                        <label for="uname" id="label--login">Email</label>
                        <input
                            className="form-control"
                            type="text"
                            id="uname"
                            value={username}
                            onChange={handleUsername}
                            placeholder="Enter email here..." />
                    </div>
                    <button
                        className="btn btn-login"
                        type="submit"
                        id="btn--override"
                        onClick={handleClick}
                    >Reset Password</button>
                </form>
                <hr />
                <span className="text-center">Need an account? <strong><a class="text-capitalize" id="a--login">SIGN UP</a></strong></span>
            </div>
        </div>

    )
}