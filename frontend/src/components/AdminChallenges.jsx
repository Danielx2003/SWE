import React, { useEffect, useState, useContext } from 'react'
import { IPContext } from "../App.js"
import {useLocation} from 'react-router-dom'
import axios from 'axios'

export default function AdminQRCodes() {
    const [data, setData] = useState([])
    const IP = useContext(IPContext)
    const loc = useLocation()

    useEffect(() => {
        const getQRCodes = async () => {
          const response = await axios.get(
            `http://${IP}:8000/qrcodes/`,
            {'withCredentials': true}
          )
          .then((res) => res.data)
          .then((data) => setData(data))
          .catch(() => {})
        }
    
        getQRCodes()
    }, [`http://${IP}:8000/qrcodes/`])

    return (
        <>
            <div className="admin-table-header d-flex flex-row w-100 justify-content-between pt-4 pb-4 bg-white">
                <strong className="ms-4">Challenges</strong>
                <a href="/admin/create">
                <button className="me-4 btn text-light">+</button>
                </a>
            </div>
        </>
    ) 
}