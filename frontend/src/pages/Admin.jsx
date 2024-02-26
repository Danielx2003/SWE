import React from 'react'
import {Navigate} from 'react-router-dom'

import AdminCMS from '../components/AdminCMS';

export default function Admin() {
    const isAdmin = false;
    
    return (
        <>
            {isAdmin ? <AdminCMS/> : <Navigate to="/" />}
        </>
    )
}
