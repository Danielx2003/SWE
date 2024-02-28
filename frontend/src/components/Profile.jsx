import React, {useState} from 'react';


export default function Profile(props) {
    const [text, setText] = useState("")

    return (
        <div className="challenges">
            <div class="form-title">
                <h1>Name: </h1>
            </div>
            <div class="form-title">
                <h1>XP: {props.userData.xp}</h1>
            </div>
            <div class="form-title">
                <h1>Points: {props.userData.points}</h1>
            </div>
        </div>
    )

}