import React from "react"
import {useState, useEffect} from "react"
import axios from 'axios'

import FriendSearch from "../components/FriendSearch.jsx"

export default function Dropdown() {
    const [input, setInput] = useState("")
    const [visible, setVisible] = useState(true)

    return (
        <form className="">
            {visible ? <FriendSearch/> : ""}
        </form>
        
    )
}   