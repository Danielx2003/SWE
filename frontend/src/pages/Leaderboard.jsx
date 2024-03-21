import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CheckNotForAdmin from '../components/CheckNotForAdmin.jsx';

import { IPContext } from "../App.js"


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState({});
  axios.defaults.withCredentials = true;
  const IP = useContext(IPContext);
  const username = Cookies.get('username');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${IP}:8000/garden/leaderboard/?page=1&page_size=10`);
        const data = response.data.results;
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const getUserData = async() => {
      axios.get(`http://${IP}:8000/garden/garden-rank/${username}/`)
      .then(response => {
          setUserData(response.data)
        })
      .catch(error => {
          console.log("Errror getting user data.")
        });}

    getUserData();        
    fetchData();
  }, [])
  
  function isObjectInArray(array, obj) {
    for (var i = 0; i < array.length; i++) {
        console.log(array[i].username)
        console.log(obj.username)
        if (array[i].username === obj.username) {
            return true;
        }
    }
    return false;}

    let top10 = isObjectInArray(leaderboardData, userData)
    console.log(top10);
    ;


  if(top10){
    return (
      <>
      <CheckNotForAdmin />
      <div className="leaderboard-wrapper">
        <div className="leaderboard">
          <table>
            <thead id="header">
              <tr>
                <th className="headerTable">Place</th>
                <th className="headerTable">Username</th>
                <th className="headerTable">Points</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {leaderboardData.map((item, index) => (
                <tr key={index} className={item.username === userData.username ? 'userRow' : ''}>
                  <td className="tableRowText">{item.rank}</td>
                  <td className="tableRowText">{item.username}</td>
                  <td className="tableRowText">{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }
  
  else{
    return (
      <>
      <CheckNotForAdmin />
      <div className="leaderboard-wrapper">
        <div className="leaderboard">
          <table>
            <thead id="header">
              <tr>
                <th className="headerTable">Place</th>
                <th className="headerTable">Username</th>
                <th className="headerTable">Points</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {leaderboardData.map((item, index) => (
                <tr key={index}>
                  <td className="tableRowText">{item.rank}</td>
                  <td className="tableRowText">{item.username}</td>
                  <td className="tableRowText">{item.points}</td>
                </tr>
              ))}
              <tr className='userRow'>
                  <td className="tableRowText">{userData.rank}</td>
                  <td className="tableRowText">{userData.username}</td>
                  <td className="tableRowText">{userData.points}</td>
                </tr>
  
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }
  };

export default Leaderboard;
