import { useState, useContext, useEffect } from 'react';
import { IPContext } from "../App.js"
import { FaCoins } from 'react-icons/fa'

import axios from 'axios';
import ShopSection from '../components/ShopSection.jsx';

export default function Shop() {
    const [coins, setCoins] = useState(0)
    const IP = useContext(IPContext)

    useEffect(() => {
        const getUserCoins = async () => {
            const response = await axios.get(
                `http://${IP}:8000/garden/garden-data/`,
                {withCredentials: true}
            )
            .then((res) => {
                setCoins(res.data.coins)
            })
        }

        getUserCoins()
    }, [])

    return (
        <div className='container bg-white pt-3 store-container'>
            <span style={{fontSize: '1.4rem', float: 'right'}}>{coins} &nbsp; <FaCoins /></span>
            <br/>
            <ShopSection name='Decorations' shopRef='decorations' coins={coins} coinsFunc={setCoins} />
            <ShopSection name='Consumables' shopRef='consumables' coins={coins} coinsFunc={setCoins} />
        </div>
    )
}
