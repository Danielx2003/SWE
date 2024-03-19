import React, {useState} from 'react';
import Cookies from 'js-cookie';

export default function Profile(props) {
    const [text, setText] = useState("")

    return (
        <div className="profile">
            <div className="profile-info">
                <h1>Name:</h1> <h2>{Cookies.get('username')}</h2>
            </div>
            <div className="profile-info">
                <h1>XP:</h1>
                <h2>{props.userData.xp}</h2>
            </div>
            <div className="profile-info">
                <h1>Points: </h1>
                <h2>{props.userData.points}</h2>
            </div>
            <div className="profile-info">
                <h1>Plants: </h1>
                <h2>{props.userData.num_plants}</h2>
            </div>
        </div>
    )

}