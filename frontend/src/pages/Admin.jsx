import React, { useEffect, useState, useContext } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import CheckForAdmin from '../components/CheckForAdmin'
import AdminUserGroups from '../components/AdminUserGroups.jsx'
import { IPContext } from "../App.js"
import AdminQRCodes from '../components/AdminQRCodes.jsx'
import AdminChallenges from '../components/AdminChallenges.jsx'
import { Button } from '@mui/material'
import { FaQrcode, FaUser, FaEnvelope } from 'react-icons/fa'

export default function Admin() {
  const [group, setGroup] = useState([])
  const [page, setPage] = useState(0)
  const IP = useContext(IPContext)
  const loc = useLocation()

  useEffect(() => {
    const getUserAdmin = async () => {
      const response = await axios.get(
        `http://${IP}:8000/authentication/user/`,
        {'withCredentials': true}
      )
      .then((res) => res.data)
      .then((data) => {
          setGroup(data.groups)
          console.log(data.groups)
      })
      .catch(() => {})
    }

    getUserAdmin()
  }, [])

  const handleQRChange = () => setPage(0)
  const handleUserChange = () => setPage(1)
  const handleChallengeChange = () => setPage(2)

  return (
    <>
      <CheckForAdmin />

      <div className='admin-navbar d-flex flex-row justify-content-around'>
        <Button 
          className='admin-navbar-buttons'
          onClick={handleQRChange}>
          <FaQrcode />
        </Button>
        <Button 
          className='admin-navbar-buttons'
          onClick={handleChallengeChange}>
          <FaEnvelope />
        </Button>
        {
          (group.includes('admin') &&
            <>
              <Button 
                className='admin-navbar-buttons'
                onClick={handleUserChange}>
                <FaUser />
              </Button>
            </>
          )
        }
      </div>
      
      <div>
        {
          (page == 1 &&
            <AdminUserGroups currentUserPerms={group} />
          ) || (page == 0 &&
            <AdminQRCodes />
          ) || (page == 2 &&
            <AdminChallenges />  
          )
        }
      </div>
    </>
  )
}