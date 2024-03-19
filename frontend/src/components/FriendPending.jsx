import React, {useContext, useState, useEffect} from 'react';
import { IPContext } from "../App.js"
import Cookies from 'js-cookie';
import axios from 'axios'

export default function FriendPending(props) {
    axios.defaults.withCredentials = true;

    const IP = useContext(IPContext)
    const [visible, setVisible] = useState(true)

    function handleReject(e) {
        const rejectFriendRequest = async() => {
            axios.delete(`http://${IP}:8000/friendship/reject/${props.id}/`, {
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
        rejectFriendRequest()
    }

    
    function handleAccept(e) {
        const acceptFriendRequest = async() => {
            axios.patch(`http://${IP}:8000/friendship/accept/${props.id}/`,{}, {
                'withCredentials': true,
                credentials: "include",
                headers: {
                  "X-CSRFToken": Cookies.get('csrftoken')
                }
            })
            .then((res) => {
                setVisible(false)
            })
            .catch((err) =>{
                console.log(err)
            })

        }
        acceptFriendRequest()
    }

    return (
        <>
        {visible ?         
            <div id="friends--element">
                <h1>{props.username}</h1>
            <div id="friend-btn-container">
                <button className="btn"
                    onClick={handleAccept}
                >ACCEPT</button>
                <button className="btn"
                    onClick={handleReject}
                >REJECT</button>
            </div>

        </div>
        :
        ""
        }
        </>
)
}