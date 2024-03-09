import {React, useContext, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IPContext } from "../App.js"

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
                if (!data.groups.includes("admin")) {
                    navigate("/")
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
