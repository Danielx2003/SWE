import React, {useState} from 'react';


export default function Profile() {
    const [text, setText] = useState("")

    return (
        <div className="challenges">
            <div class="form-title">
                <h1>Name: </h1>
            </div>
            <div class="form-title">
                <h1>XP: </h1>
            </div>
            <div class="form-title">
                <h1>Points: </h1>
            </div>
        </div>
    )

}