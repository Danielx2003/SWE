import React, {useState, useEffect, useContext} from "react"
import { IPContext } from "../App.js"
import FriendAccepted from "../components/FriendAccepted.jsx"
import axios from 'axios'
import Cookies from 'js-cookie'


export default function FriendsList() {
    const [friendsList, setFriendsList] = useState([])
    const IP = useContext(IPContext)
    
    useEffect(() => {
        const getFriendsList = async() => {
            axios.get(`http://${IP}:8000/friendship/friends`,{
                'withCredentials': true
            })
            .then((res) => {
                setFriendsList(res.data.accepted)
                console.log(friendsList)
            })
        }
        getFriendsList()
    },[])

    return (
        <div id="friends--container">
            {friendsList.length != 0 ? friendsList.map((friend) => <FriendAccepted key={friend.id} id={friend.id} username={friend.from_user.username == Cookies.get('username') ? friend.to_user.username : friend.from_user.username}/>) : "You have no friends"}
        </div>

    )

}