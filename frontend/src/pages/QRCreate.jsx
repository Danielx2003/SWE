import {React, useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

import { IPContext } from "../App.js"
import CheckForAdmin from '../components/CheckForAdmin.jsx'

export default function QRCreate() {
  const [name, setName] = useState("")
  const [xp, setXp] = useState("")
  const [points, setPoints] = useState("")
  const [type, setType] = useState("1")
  const [date, setDate] = useState("")

  const [btnPressed, setBtnPressed] = useState(false)
  const [count, setCount] = useState(0)
  let navigate = useNavigate()

  const IP = useContext(IPContext)

  useEffect(() => {
    const postQRCode = async () => {
      const response = await axios.post(
        `http://${IP}:8000/qrcodes/`, {
          'name': name,
          'xp': xp,
          'points': points,
          'qr_type': type,
          'expiration_date': date + ":00Z",
         },
        {
          'withCredentials': true,
          credentials: "include",
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get('csrftoken')
          }
        }
      )
      .then((res) => {
        console.log(res)
        alert('QR Code successfully created!')
        navigate('/admin/')
      })
      .catch((err) => {
        console.log(err)
        alert("Invalid input.")
      })
    }

    if (count > 1) {
      postQRCode()
    }
    else {
      setCount(count => count + 1)
    }
  }, [btnPressed])

  function handleClick(e) {
    e.preventDefault()
    setBtnPressed(prev => !prev)
  } 

  function handleNameChange(e) {
    setName(e.target.value)
    console.log("Name changed: " + e.target.value)
  }

  function handleXPChange(e) {
    setXp(e.target.value)
    console.log("XP changed: " + e.target.value)
  }

  function handlePointsChange(e) {
    setPoints(e.target.value)
    console.log("Points changed: " + e.target.value)
  }

  function handleTypeChange(e) {
    setType(e.target.value)
    console.log("Type changed: " + e.target.value)
  }

  function handleDateChange(e) {
    setDate(e.target.value)
    console.log("Date changed: " + e.target.value)
  }

  return (
    <>
      <div class="login-container">
      <CheckForAdmin />
      <div class="form-container">
        <div class="form-group">
          <label for="name">Event Name</label>
          <input 
            class="form-control" 
            type="text" 
            value={name}
            onChange={handleNameChange} />
        </div>
        <div class="form-group">
          <label for="points">Points Gained</label>
          <input 
          class="form-control" 
          type="text" 
          value={points}
          onChange={handlePointsChange} />
        </div>
        <div class="form-group">
          <label for="xp">XP Gained</label>
          <input 
            class="form-control" 
            type="text" 
            value={xp}
            onChange={handleXPChange} />
        </div>
        <div class="form-group">
          <label for="type">QR Type</label>
          <select class="form-control" value={type} onChange={handleTypeChange}>
            <option value="1">Plant</option>
            <option value="2">XP</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Expiration Date</label>
          <input 
            className="form-control"
            type="datetime-local"
            defaultValue={date}
            onChange={handleDateChange} />
        </div>

        <button 
          class="btn btn-login" 
          type="submit"
          onClick={handleClick}>
          Submit and create QR Code
        </button>
      </div>
    </div>
    </>
  )
}