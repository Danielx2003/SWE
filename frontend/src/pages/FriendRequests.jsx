import React, {useState, useEffect, useContext} from "react"
import { IPContext } from "../App.js"
import { useNavigate } from "react-router-dom";
import FriendPending from "../components/FriendPending.jsx"
import axios from 'axios'
import Cookies from 'js-cookie';
import CheckNotForAdmin from '../components/CheckNotForAdmin.jsx';

export default function FriendsList() {
    const [pendingList, setPendingList] = useState([])
    const IP = useContext(IPContext)
    let navigate = useNavigate()
    
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

    function handleRedirect() {
        navigate("/friend-search")
    }

    return (
        <>
        <CheckNotForAdmin />
        <div id="friends--container">
            {pendingList.length != 0 ? pendingList.map((friend) => <FriendPending key={friend.id} id={friend.id} username={friend.from_user.username == Cookies.get('username') ? friend.to_user.username : friend.from_user.username}/>) : <p className="no-friends-txt">You have no friend requests</p>}
            <div id="add-friends-container">
                <p id="add-friends-txt">Why not try adding more friends?</p> <button className="btn" id="add-friends-btn" onClick={handleRedirect}>Search for friends here</button>
            </div>
        </div>
        </>

    )

}