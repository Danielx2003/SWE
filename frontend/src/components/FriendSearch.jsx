import React, {useState, useEffect} from 'react';
import FriendComp from "./FriendComp"
import axios from 'axios'

export default function FriendSearch(props) {
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
        }
        
        if (input.length >= 3) {
            fetchUsers()
        }
    }, [doneTyping])

    function handleTyping(e) {
        setInput(e.target.value)
    }


    return (
        <div className="congrats--container">
            <div className="congrats--form">
                <form className="">
                    <input onChange={handleTyping}
                                className="form-control"
                                value={input}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setDoneTyping(prev=> !prev)
                                        e.preventDefault()
                                        }
                                    }}
                                placeholder="Search for a user..."/>
                </form>
                {requestResult.map((friend) => <FriendComp key={friend.id} username={friend.username}/>)}
            </div>
    </div>

    )
}