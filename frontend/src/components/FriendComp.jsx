import React from 'react';
export default function FriendComp(props) {
    return (
        <div className="friend-group">
            <div className="friend-container">
                    <h4 className="">{props.username}</h4>
            </div>
        </div>
    )

}