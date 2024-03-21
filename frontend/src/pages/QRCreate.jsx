import {React, useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

import { IPContext } from "../App.js"
import CheckForAdmin from '../components/CheckForAdmin.jsx'

export default function QRCreate() {
  const [name, setName] = useState("")
  const [coins, setCoins] = useState("")
  const [points, setPoints] = useState("")
  const [type, setType] = useState("1")
  const [date, setDate] = useState("")

  const [btnPressed, setBtnPressed] = useState(false)
  const [count, setCount] = useState(0)
  let navigate = useNavigate()

  const POINTS_CAP = 50
  const COIN_CAP = 50

  const IP = useContext(IPContext)

  useEffect(() => {
    const postQRCode = async () => {
      const response = await axios.post(
        `http://${IP}:8000/qrcodes/`, {
          'name': name,
          'coins': coins,
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

  const handleNameChange = (e) => setName(e.target.value)
  const handleXPChange = (e) => (e.target.value <= COIN_CAP) ? setCoins(e.target.value) : setCoins(POINTS_CAP)
  const handlePointsChange = (e) => (e.target.value <= COIN_CAP) ? setPoints(e.target.value) : setPoints(POINTS_CAP) 
  const handleTypeChange = (e) => setType(e.target.value)
  const handleDateChange = (e) => setDate(e.target.value)
  
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
          type="number" 
          min='0'
          value={points}
          onChange={handlePointsChange} />
        </div>
        <div class="form-group">
          <label for="coins">Coins Gained</label>
          <input 
            class="form-control" 
            type="number" 
            min='0'
            value={coins}
            onChange={handleXPChange} />
        </div>
        <div class="form-group">
          <label for="type">QR Type</label>
          <select class="form-control" value={type} onChange={handleTypeChange}>
            <option value="1">Plant</option>
            <option value="2">Coins</option>
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