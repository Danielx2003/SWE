import React, {useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import { IPContext } from "../App.js"
import FriendAccepted from "../components/FriendAccepted.jsx"
import axios from 'axios'
import Cookies from 'js-cookie'


export default function FriendsList() {
    const [friendsList, setFriendsList] = useState([])
    const [displayedFriends, setDisplayedFriends] = useState([])
    const [input, setInput] = useState("")
    const IP = useContext(IPContext)
    let navigate = useNavigate()
    useEffect(() => {
        const getFriendsList = async() => {
            axios.get(`http://${IP}:8000/friendship/friends`,{
                'withCredentials': true
            })
            .then((res) => {
                setFriendsList(res.data.accepted)
            })
        }
        getFriendsList()
    },[])

    function handleTyping(e) {
        const result = getFilteredItems(e.target.value)
        setDisplayedFriends([...result])
        setInput(e.target.value)
    }

    function getFilteredItems(search) {
        const playerNames = []
        friendsList.forEach ((friend) => {
            console.log(friend, "Is the friend")
            if (friend.from_user.username == Cookies.get('username')) {
                playerNames.push({id: friend.id, username:friend.to_user.username})
            } else {
                playerNames.push({id: friend.id, username : friend.from_user.username})
            }
        })
        return playerNames.filter(player => 
            player.username.toLowerCase().includes(search.toLowerCase())
        );
    }

    function handleRedirect() {
        navigate("/friend-search")
    }


    return (
        <>
        <div id="friends--container">
            <form> 
                    <input onChange={handleTyping}
                                className="form-control"
                                value={input}
                                placeholder="Search your friends list..."
                                id="friend-search-box"
                                />
            </form>
            
            {(friendsList.length != 0 && input.length==0) ? friendsList.map((friend) => <FriendAccepted key={friend.id} id={friend.id} username={friend.from_user.username == Cookies.get('username') ? friend.to_user.username : friend.from_user.username}/>) 
                : (friendsList.length != 0 && input.length!=0) ? displayedFriends.map((friend) => <FriendAccepted key={friend.id} id={friend.id} username={friend.username}/>) 
                : <p>Seems like you have no friends...</p>}
            <div id="add-friends-container">
            <p id="add-friends-txt">Why not try adding more friends?</p> <button className="btn" id="add-friends-btn" onClick={handleRedirect}>Search for friends here</button>
            </div>

        </div>
        </>

    )

}