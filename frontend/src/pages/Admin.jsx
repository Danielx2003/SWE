import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CheckForAdmin from '../components/CheckForAdmin';
import AdminUserGroups from '../components/AdminUserGroups.jsx';
import { IPContext } from "../App.js";
import AdminQRCodes from '../components/AdminQRCodes.jsx';
import { Button } from '@mui/material';
import { FaQrcode, FaUser } from 'react-icons/fa';

export default function Admin() {
  // State variables for managing group data and page navigation
  const [group, setGroup] = useState([]);
  const [page, setPage] = useState(0);
  const IP = useContext(IPContext); // Using context to access IP address

  const USER_IS_ADMIN = group.includes('admin')

  useEffect(() => {
    // Function to fetch user admin data from the server
    const getUserAdmin = async () => {
      try {
        const response = await axios.get(
          `http://${IP}:8000/authentication/user/`, 
          {'withCredentials': true} 
        );
        const data = response.data; // Extracting data from the response
        setGroup(data.groups); // Setting the group state with received data
        console.log(data.groups); 
      } catch (error) {
        console.error(error);
      }
    };

    getUserAdmin(); 
  }, []); 

  // Function to handle change to QR Codes page
  const handleQRChange = () => setPage(0);
  
  // Function to handle change to User Groups page
  const handleUserChange = () => setPage(1);

  return (
    <> 
      {/* Rendering custom component to check for admin privileges */}
      <CheckForAdmin /> 

      {/* Navigation buttons */}
      <div className='admin-navbar d-flex flex-row justify-content-around'>
        {/* Button for QR Codes page */}
        <Button 
          className='admin-navbar-buttons'
          onClick={handleQRChange}>
          <FaQrcode /> 
        </Button>
        {/* Button for User Groups page, rendered only if user has admin privileges */}
        {USER_IS_ADMIN && 
          <Button 
            className='admin-navbar-buttons'
            disabled={!USER_IS_ADMIN} 
            onClick={handleUserChange}>
            <FaUser /> {/* User icon */}
          </Button>
        }
      </div>
      
      {/* Rendering the appropriate page based on the selected page state */}
      <div>
        {/* Conditionally rendering AdminUserGroups or AdminQRCodes components based on the selected page */}
        {page === 1 && 
          <AdminUserGroups currentUserPerms={group} />
        } 
        {page === 0 && 
          <AdminQRCodes />
        }
      </div>
    </>
  );
}