import {React, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CheckForAdmin() {
    const navigate = useNavigate()
    useEffect(() => {
        const checkAdmin = async () => {
            const response = await axios.get(
                'http://localhost:8000/authentication/user/',
                {'withCredentials': true}
            )
            .then((res) => res.data)
            .then((data) => {
                console.log(data)
                
                if (!data.groups.includes("admin")) {
                    alert("You do not have permission to access this page.")
                    navigate("/")
                }
            })
        }

        checkAdmin()
    }, [])

    return (
        <></>
    )
}
