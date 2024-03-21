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
                <h1>Coins:</h1>
                <h2>{props.userData.coins}</h2>
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