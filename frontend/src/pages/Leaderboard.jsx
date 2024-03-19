import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

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
        });

  }

    getUserData();        
    fetchData();
  }, []);

  return (
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
                <td class="tableRowText">{item.rank}</td>
                <td class="tableRowText">{item.username}</td>
                <td class="tableRowText">{item.points}</td>
              </tr>
            ))}
            <tr class='userRow'>
                <td class="tableRowText">{userData.rank}</td>
                <td class="tableRowText">{userData.username}</td>
                <td class="tableRowText">{userData.points}</td>
              </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
