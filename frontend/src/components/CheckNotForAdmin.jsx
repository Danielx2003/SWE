import {React, useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IPContext } from "../App.js"

// A component to check that a user is NOT admin. Runs at the top of the
// render ideally - gets the user's role status and navigates away if they are
// admin or game master.
export default function CheckForAdmin() {
    const navigate = useNavigate()
    const IP = useContext(IPContext)

    useEffect(() => {
        const checkAdmin = async () => {
            const response = await axios.get(
                `http://${IP}:8000/authentication/user/`,
                {'withCredentials': true}
            )
            .then((res) => res.data)
            .then((data) => {
                if (data.groups.includes("admin") || data.groups.includes("game_master")) {
                    navigate("/admin")
                }
            })
            .catch((_) => {
                navigate("/")
            })
        }

        checkAdmin()
    }, [])

    return (
        <></>
    )
}
