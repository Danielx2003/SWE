import React, { useEffect, useContext, useState } from 'react'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import { IconButton } from '@mui/material'
import axios from 'axios'
import { IPContext } from "../App.js"

import ShopItemModal from './ShopItemModal.jsx'

export default function ShopSection(props) {
    const [items, setItems] = useState([])
    const [page, setPage] = useState(0)
    
    const itemsPerPage = 2
    
    const IP = useContext(IPContext)

    useEffect(() => {
        const getStoreItems = async () => {
            const response = await axios.get(
                `http://${IP}:8000/store/get-store/${props.shopRef}/`,
                { withCredentials: true }
            )
            .then((res) => {
                setItems(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log("Could not find a store called " + props.shopRef + ".")
            })
        }

        getStoreItems()
    }, [])

    return (
        <section id={props.name}>
            <div className='d-flex flex-row flex-nowrap justify-content-between align-items-center mt-3 h-auto'>
                <h2 className='mb-0 ms-2'>{props.name}</h2>
                <div className='d-flex flex-row h-100 align-items-center'>
                    <IconButton
                        aria-label="previous page"
                        disabled={page <= 0}
                        onClick={() => setPage(page - 1)}
                    >
                    <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        aria-label="next page"
                        disabled={page >= Math.ceil(items.length / itemsPerPage) - 1}
                        onClick={() => setPage(page + 1)}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </div>
            </div>

            <div className='store-jumbotron d-flex flex-row justify-content-around'>
                {
                    (itemsPerPage > 0 ? items.slice(page * itemsPerPage, itemsPerPage + page * itemsPerPage)
                    : items).map((item) =>  
                        <ShopItemModal item={item} coins={props.coins} coinsFunc={props.coinsFunc} />
                    ) 
                }
            </div>
            <br/>
            <br/>
        </section>
    ) 
}
