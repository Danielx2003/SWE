import React from "react"
import {useState, useEffect} from "react"
import axios from 'axios'

import FriendComp from "../components/FriendComp.jsx"

export default function Dropdown() {
    const [input, setInput] = useState("")
    const [requestResult, setRequestResult] = useState([])
    const [doneTyping, setDoneTyping] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            console.log("getting users with the name",input)
            const response = await axios.get(
                `http://localhost:8000/friendship/user-search/?query=${input}`,
                {'withCredentials': true}
            )
            .then((res) => setRequestResult(res.data.results))
            .catch((err) => console.log(err))
            console.log(requestResult)
        }
        
        if (input.length >= 3) {
            fetchUsers()
        }
    }, [doneTyping])

    function handleTyping(e) {
        setInput(e.target.value)
    }


    return (
        <form className="">
            <div className="form-group">
                <input onChange={handleTyping}
                    className="form-control"
                    value={input}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setDoneTyping(prev=> !prev)
                            e.preventDefault()
                            }
                        }}
                    placeholder="Search for a user...">
            </input>
            </div>
            {requestResult.map((friend) => <FriendComp key={friend.id} username={friend.username}/>)}
        </form>
        
    )
}   