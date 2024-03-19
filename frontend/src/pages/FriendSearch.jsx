import React, {useState, useEffect, useContext} from 'react';
import FriendAdd from "../components/FriendAdd.jsx"
import { IPContext } from "../App.js"
import axios from 'axios'

export default function FriendSearch(props) {
    const [input, setInput] = useState("")
    const [newFriends, setNewFriends] = useState([])

    const IP = useContext(IPContext)

    function handleTyping(e) {
        setInput(e.target.value)
        const fetchUsers = async () => { 
            console.log(e.target.value)
            axios.get(`http://${IP}:8000/friendship/user-search/?query=${e.target.value}`,
                {
                    'withCredentials': true
                }
            )
                .then((res) => {
                    setNewFriends(res.data.results)
                })
                .catch((err) => console.log(err))
            
        }
            
        if (e.target.value.length >= 3) {
            fetchUsers()
        } else {
            setNewFriends([])
        }
    }

    return (
        <div id="friends--container">
            <form> 
                    <input onChange={handleTyping}
                                className="form-control"
                                value={input}

                                placeholder="Search for a user..."
                                id="friend-search-box"
                                />
            </form>
        {newFriends.map((friend) => <FriendAdd key={friend.id} id={friend.id} username={friend.username} status={friend.status}/>)}
        </div>
    )
}