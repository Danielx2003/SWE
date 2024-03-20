import { useState, useContext, useEffect } from 'react';
import { IPContext } from "../App.js"

import Modal from '@mui/material/Modal';

export default function ChallengeModal({ key, info }) {
  const [open, setOpen] = useState(false);
  const IP = useContext(IPContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen} className='btn btn-login form-group'>
        <div>
            {info.name}
        </div>
      </button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
            <div className='detail--form'>
                <h4 className="form-title">Challenge: {info.name}</h4>
                <div className="form-group">
                </div>
                <h4 className="form-title">Reward: {info.xp} point{info.xp != 1 ? "s" : ""}</h4>
                <button 
                    className='btn btn-login'
                    id="btn--override"
                    onClick={handleClose}>
                    Close
                </button>
            </div>
      </Modal>
    </div>
  );
}