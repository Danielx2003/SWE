import React from 'react';

export default function FriendComp(props) {
    console.log(props.username)

    return (
        <div className="congrats--container">
            <h1>{props.username}</h1>
        </div>
)
}