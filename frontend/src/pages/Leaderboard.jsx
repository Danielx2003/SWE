import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/garden/leaderboard/?page=1&page_size=10');
        const data = response.data.results;
        debugger;
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

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
                <td class="tableRowText">{index + 1}</td>
                <td class="tableRowText">{item.username}</td>
                <td class="tableRowText">{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
