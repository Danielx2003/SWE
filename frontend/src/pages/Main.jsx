import React, {useEffect} from 'react';

export default function Main() {
    useEffect(() => {
        /*
        on the main page for the user
        need to add the garden image
        need to request their data and dispaly (garden, level etc)
        */
        const makeReq = async () => {
            const response = await fetch('api/hello-world/')
            const json = await response.json()
            console.log(json)
        }
        makeReq()
    }, [])    

    return (
        <div>
            <h1>ADD GARDEN HERE?</h1>
        </div>
    )
}