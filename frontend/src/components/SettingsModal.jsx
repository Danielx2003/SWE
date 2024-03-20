import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { IPContext } from "../App.js"
import Cookies from 'js-cookie'
import axios from 'axios'

import Modal from '@mui/material/Modal';

export default function SettingsModal({ user }) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const Navigate = useNavigate()
  const IP = useContext(IPContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handling account deletion confirmation
  const handleAccountDelete = () => setIsOpen(true);
  const handleConfirm = async () => {
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

    Cookies.remove('username')
    Cookies.remove('csrftoken')
    Cookies.remove('sessionid')

    Navigate('/')
    handleClose()
  }

  return (
    <div>
      <span 
        onClick={handleOpen}
        >
            Settings
      </span>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{overflow: 'scroll'}}
      >
        <div className='settings-box'>
            <h3>You are currently signed in as <strong>{user}</strong>.</h3>
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