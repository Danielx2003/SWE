import { useState, useContext, useEffect } from 'react';
import { IPContext } from "../App.js"
import { FaCoins } from 'react-icons/fa'
import Cookies from 'js-cookie'

import axios from 'axios';

import Modal from '@mui/material/Modal';

export default function ShopItemModal({ item, coins, coinsFunc }) {
  const [open, setOpen] = useState(false);
  const [userIsBroke, setUserBroke] = useState(false);
  const IP = useContext(IPContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePurchaseItem = async () => {
    // Send a request to the API, asking to purchase this item.
    const response = await axios.post(
        `http://${IP}:8000/store/purchase/`, 
        {
            'item_type': item.item_type,
            'quantity': 1
        }, 
        { 
            withCredentials: true, 
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        }
    ).then((res) => res.data)
    .catch((err) => err.response.data)

    
    if (response.message == "Insufficient coins") {
        // User does not have enough money, so display error and return
        setUserBroke(true)
        return
    } else if (response.message == "Purchase successful") {
        // Otherwise, purchase and subtract from existing count
        alert("Successfully purchased item " + item.item_type.replace("_", " ") + ".")
        coinsFunc(coins - item.price)
    }

    handleClose()
  }

  return (
    <div>
        <div onClick={handleOpen} className='d-flex flex-column justify-content-center align-items-center store-jumbotron-element'>
            <span className='text-capitalize'>{item.item_type.replace("_", " ")}</span>
            <span>{item.price} <FaCoins /> </span>
        </div>
      
        {/* Modal to be displayed when user clicks on a shop item. */}
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                <div className='settings-box'>
                    <h4 className="text-capitalize mb-0">{item.item_type.replace("_", " ")}</h4>
                    <div className="form-group">
                    </div>
                    <span className="form-title">Would you like to purchase this {item.item_type.replace("_", " ")}?</span>
                    <button 
                        className='btn bg-white'
                        onClick={handlePurchaseItem}>
                        {item.price} <FaCoins /> 
                    </button>
                    {userIsBroke && <span 
                        className='text-danger'
                        >
                            You do not have enough <FaCoins /> to complete this transaction.
                    </span>}
                </div>
        </Modal>
        </div>
  );
}