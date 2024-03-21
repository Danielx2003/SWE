import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { IPContext } from "../App.js"
import Cookies from 'js-cookie'
import axios from 'axios'

import Modal from '@mui/material/Modal';

// A modal to handle user settings and actions on their account, such
// as the deletion or editing of said account, in accordance with GDPR.
export default function SettingsModal({ user }) {
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState(user);
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate()
  const IP = useContext(IPContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handling account deletion confirmation
  const handleAccountDelete = () => setIsOpen(true);
  const handleConfirm = async () => {
    // Delete account via API
    const response = await axios.post(
        `http://${IP}:8000/authentication/delete-account/`,
        {},
        {
            'withCredentials': true,
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        }
    )

    // Purge local cookies to reset account 
    Cookies.remove('username')
    Cookies.remove('csrftoken')
    Cookies.remove('sessionid')

    // Navigate to main and close modal
    Navigate('/')
    handleClose()
  }

  const handleInputChange = (e) => setNewUser(e.target.value)

  const handleEditSubmit = async () => {
    // Edit username via API
    const response = await axios.post(
      `http://${IP}:8000/authentication/edit-username/`,
      {
        'new_username': newUser
      },
      {
          'withCredentials': true,
          headers: {
              'X-CSRFToken': Cookies.get('csrftoken')
          }
      }
    )

    alert('You have successfully changed your name from ' + user + ' to ' + newUser)

    // Set username cookie to new username if successful
    Cookies.set('username', newUser)

    // Navigate to main (to avoid issues with Main page) and close modal
    Navigate('/')
    handleClose()
  }

  return (
    <div className='w-100 h-100'>
      <div
        onClick={handleOpen}
        >
            Settings
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflow: 'scroll'}}
      >
        <div className='settings-box'>
            <h3>You are currently signed in as <strong>{user}</strong>.</h3>
            <div className='d-flex w-100 flex-column align-items-center justify-content-around'>
              <h5 className=''>Edit Username</h5>
              <input
                defaultValue={user}
                value={newUser}
                onChange={handleInputChange}
                className='w-100 mb-2'
              />
              <button 
                className='btn w-100'
                onClick={handleEditSubmit}
                >
                  Submit
              </button>
            </div>
            <button
                className='btn settings-button-delete'
                onClick={handleAccountDelete}
            >
                Delete my account.
            </button>
            {isOpen && (
                <div className="d-flex flex-column">
                    <p>Are you sure you want to delete your account?</p>
                    <div className="d-flex flex-row">
                        <button 
                            className='btn w-50'
                            onClick={handleConfirm}>
                                Yes
                        </button>
                        <button 
                            className='btn w-50'
                            onClick={() => setIsOpen(false)}>
                                No
                        </button>
                    </div>
                </div>
            )}

            <button 
                className='btn'
                onClick={handleClose}>
                Close
            </button>
        </div>
      </Modal>
    </div>
  );
}