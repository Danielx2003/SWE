import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function Logout() {
    const [renderCount, setCount] = useState(0)
    const [btnPressed, setBtnPressed] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const logout = async () => {
            const response = await axios.post(
                'http://localhost:8000/authentication/logout/',
                {},
                {
                    'withCredentials': true,
                    headers: {
                        'X-CSRFToken': Cookies.get('csrftoken')
                    }
                }
            )
            .then(() => {
                Cookies.remove('username')
                Cookies.remove('csrftoken')
                Cookies.remove('sessionid')

                navigate('/')
            })
            .catch((err) => {
                alert("An error occured when trying to logout: " + err)
            })
        }

        if (renderCount > 1) {
            logout()
        }
        else {
            setCount(prev => prev + 1)
        }
    }, [btnPressed])

    function handleClick(e) {
        e.preventDefault()
        setBtnPressed(prev => !prev)
    }

    return (
        <a class="nav-group-element" onClick={handleClick}>Logout</a>
    )
}
