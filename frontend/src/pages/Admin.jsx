import React, { useEffect, useState, useContext } from 'react'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import CheckForAdmin from '../components/CheckForAdmin'
import AdminUserGroups from '../components/AdminUserGroups.jsx'
import { IPContext } from "../App.js"

export default function Admin() {
  const [data, setData] = useState([])
  const [group, setGroup] = useState([])
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

  return (
    <>
      <CheckForAdmin />

      {
        (group.includes('admin')) ?
        <>
          <AdminUserGroups />
        </>
        :
        <>
        
        </>
      }
      
      <div className="d-flex flex-row w-100 justify-content-between pt-3 pb-2 ps-2 bg-white">
        <strong className="ms-4">QR Codes</strong>
        <a href="/admin/create">
          <button className="me-4 btn text-light">+</button>
        </a>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Points</th>
            <th scope="col">XP</th>
            <th scope="col">Download</th>
            <th scope="col">Create Date</th>
            <th scope="col">Expiry Date</th>
          </tr>
        </thead>
        <tbody>
        {
          (!data) ? 
            <tr>
              <th scope="row">Loading...</th>
            </tr>
          :
          data.map((val, i) => {
            return (
              <tr>
                <th scope="row">{val.id}</th>
                <td>{val.name}</td>
                <td>{val.qr_type}</td>
                <td>{val.points}</td>
                <td>{val.xp}</td>
                <td>
                  <a href={`http://${IP}:8000/qrcodes/${val.id}/image/`} download>
                    <button className="btn btn-info p-3"></button>
                  </a>
                </td>
                <td>{val.creation_date}</td>
                <td>{val.expiration_date}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
    </>
  )
}