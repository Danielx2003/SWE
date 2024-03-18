import React, {useState, useEffect, useContext} from "react"
import { IPContext } from "../App.js"
import FriendPending from "../components/FriendPending.jsx"
import axios from 'axios'
import Cookies from 'js-cookie';

export default function FriendsList() {
    const [pendingList, setPendingList] = useState([])
    const IP = useContext(IPContext)

    useEffect(() => {
        const getFriendsList = async() => {
            axios.get(`http://${IP}:8000/friendship/friends`,{
                'withCredentials': true
            })
            .then((res) => {
                setPendingList(res.data.pending)
            })
            console.log(pendingList, "is the list")
        }
        getFriendsList()
    },[])

    return (
        <div id="friends--container">
            {pendingList.length != 0 ? pendingList.map((friend) => <FriendPending key={friend.id} id={friend.id} username={friend.from_user.username == Cookies.get('username') ? friend.to_user.username : friend.from_user.username}/>) : "You have no friend requests"}
        </div>

    )

}