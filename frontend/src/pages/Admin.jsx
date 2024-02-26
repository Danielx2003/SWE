import React from 'react'

export default function Admin() {
    const isAdmin = false;
    
    return (
        <>
            {isAdmin ? <AdminCMS/> : <div>You cannot access this material.</div>}
        </>
    )
}

function AdminCMS() {
    
}