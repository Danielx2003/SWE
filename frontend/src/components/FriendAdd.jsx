import React, {useContext, useState, useEffect} from 'react';
import { IPContext } from "../App.js"
import Cookies from 'js-cookie';
import axios from 'axios'

export default function FriendAdd(props) {
    const IP = useContext(IPContext)
    const [btnText, setBtnText] = useState("ADD")

    function handleClick(e) {
        e.preventDefault()
        const sendFriendReq = async() => {
            const response = await fetch(`http://${IP}:8000/friendship/friends/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    'X-CSRFToken' : Cookies.get('csrftoken')

                },
                credentials: "include",
                body: JSON.stringify({
                    to_user_id: props.id
                })
            })
            console.log(response, "is the response")
            if (response.ok) {
                setBtnText("SENT")
            } else {
                alert("Error adding",props.username)
            }


        }
        sendFriendReq()
    }

    return (
        <div id="friends--element">
            <h1>{props.username}</h1>
            <button className="btn"
                onClick={handleClick}
            >
            {btnText}</button>
        </div>
)
}