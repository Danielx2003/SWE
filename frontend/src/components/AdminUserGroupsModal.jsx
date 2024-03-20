import { useState, useContext } from 'react';
import axios from 'axios'
import { IPContext } from "../App.js"
import Cookies from 'js-cookie'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const conversionMatrix = { "user": 1, "admin": 2, "game_master": 3}

export default function AdminUserGroupsModal({ row, perms, page, pageFunc }) {
  const [open, setOpen] = useState(false);

  const [userChecked, setUserChecked] = useState(row.groups.includes(1));
  const [adminChecked, setAdminChecked] = useState(row.groups.includes(2));
  const [gmChecked, setGMChecked] = useState(row.groups.includes(3));

  const IP = useContext(IPContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => { 
    setUserChecked(row.groups.includes(1))
    setAdminChecked(row.groups.includes(2))
    setGMChecked(row.groups.includes(3))
    setOpen(false) 
  };

  const flipUserChecked = () => setUserChecked(!userChecked)
  const flipAdminChecked = () => setAdminChecked(!adminChecked)
  const flipGMChecked = () => setGMChecked(!gmChecked)

  function maxConvertedPermissionValue(permissions) {
    let maxValue = -Infinity;

    permissions.forEach(permission => {
        if (permission in conversionMatrix) {
            const convertedValue = conversionMatrix[permission];
            if (convertedValue > maxValue) {
                maxValue = convertedValue;
            }
        }
    });

    return maxValue;
  }

  async function handleSaveButton(event) {
    let buff = []

    if (userChecked) buff.push('1')
    if (adminChecked) buff.push('2')
    if (gmChecked) buff.push('3')

    console.log("ID: " + row.id)
    console.log("Groups: " + buff)

    const response = await axios.patch(
      `http://${IP}:8000/authentication/change-user-groups/`, 
      {
        'id': row.id,
        'groups': buff
      },
      {
        withCredentials: true,
        credentials: "include",
        headers: {
          "X-CSRFToken": Cookies.get('csrftoken')
        }
      }
    )
    .catch((err) => alert("Error: " + err))
  }

  return (
    <div>
      <Button onClick={handleOpen} className='admin-table-btn'>
        <div>
          <span>{row.id}</span>
          <span>{row.username}</span>
        </div>
      </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='modal-box'>
          <div className='d-flex flex-column justify-content-center'>
            <Typography 
              className='d-flex justify-content-center' 
              sx={{ fontFamily: "inherit" }} 
              variant="h6" 
              component="h2">
              {row.username}
            </Typography>
            <hr></hr>
            
            <div className='d-flex flex-row justify-content-center'>
              <Checkbox 
                checked={userChecked}
                onChange={flipUserChecked}
                {...label} 
                />
              <Checkbox 
                checked={adminChecked}
                onChange={flipAdminChecked}
                {...label} 
                />
              <Checkbox 
                checked={gmChecked}
                onChange={flipGMChecked}
                {...label} 
              />
            </div>

            <div className='d-flex justify-content-center pt-2'>
              <Button 
                className='btn-success'
                onClick={handleSaveButton}>
                Save
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}