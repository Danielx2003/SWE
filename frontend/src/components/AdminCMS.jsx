import React, { useEffect } from 'react'
import axios from 'axios'

export default function AdminCMS() {
  var count = 0
  var qrcodes = null

  useEffect(() => {
    const getQRCodes = async () => {
      const response = await axios.get(
        'http://localhost:8000/qrcodes/',
        {'withCredentials': true}
      )
      .then((res) => res.data);

      return response
    }

    /* const response = await fetch('http://localhost:8000/qrcodes/', 
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken" : Cookies.get('csrftoken')
        },
      })
      .then((res) => {
        console.log(res)
      })
    } */

    if (count === 0) {
      qrcodes = getQRCodes()
      count++
    }

    console.log(qrcodes)
  })

  return (
    <>
      <div className="w-100 pt-3 pb-2 ps-2 bg-white text-center"><strong>QR Codes</strong></div>
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
            qrcodes.array.map((data, i) => {
              return (
                <tr>
                  <th scope="row">data.id</th>
                  <td>data.name</td>
                  <td>data.qr_type</td>
                  <td>data.points</td>
                  <td>data.xp</td>
                  <td>data.code</td>
                  <td>data.creation_date</td>
                  <td>data.expiration_date</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  )
}
