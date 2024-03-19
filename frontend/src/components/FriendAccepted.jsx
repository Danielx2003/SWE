import React, {useContext, useState, useEffect} from 'react';
import { IPContext } from "../App.js"
import Cookies from 'js-cookie';
import axios from 'axios'

export default function FriendComp(props) {
    const IP = useContext(IPContext)
    const [btnText, setBtnText] = useState("ADD")
    const [visible, setVisible] = useState(true)
    const [input, setInput] = useState("")

    function handleUnfriend(e) {
        e.preventDefault()
        axios.delete(`http://${IP}:8000/friendship/unfriend/${props.id}/`, {
            'withCredentials': true,
            credentials: "include",
            headers: {
              "X-CSRFToken": Cookies.get('csrftoken')
            }
        })
        .then((res) => {
            setVisible(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function handleTyping(e) {
        setInput(e.target.value)
    }

    return (       
        <>
        {visible ?     
            <div id="friends--element">
            <h1>{props.username}</h1>
            <button type="button" class="btn"
            onClick={handleUnfriend}
            >REMOVE</button>
        </div>
        :
        ""
        }
        </>
)
}