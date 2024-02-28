import React, {useState} from 'react';
import Cookies from 'js-cookie';

export default function Profile(props) {
    console.log(props.userData)
    const [text, setText] = useState("")

    return (
        <div className="challenges">
            <div class="form-title">
                <h1>Name: {Cookies.get('username')}</h1>
            </div>
            <div class="form-title">
                <h1>XP: {props.userData.xp}</h1>
            </div>
            <div class="form-title">
                <h1>Points: {props.userData.points}</h1>
            </div>
            <div class="form-title">
                <h1>Plants: {props.userData.num_plants}</h1>
            </div>
        </div>
    )

}