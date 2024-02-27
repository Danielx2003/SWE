import React, {useState} from 'react';

export default function ChallengeDetails(props) {
    function closeModal(e) {
        e.preventDefault()
        props.setVisible(false)
    }

    return (
        <div className="modal--wrapper" style={{visibility: props.visible ? 'visible' : 'hidden' }}>
            <div className="congrats--container">
                <div className="detail--form">
                    <form className="">
                        <h4 className="form-title">Congratulations!</h4>
                        <div className="form-group">
                        </div>
                        <h4 className="form-title">You have won </h4>
                        <button
                            className="btn btn-login"
                            id="btn--override"
                            onClick={closeModal}
                        >Close</button>
                    </form>
                    <hr />
                </div>
            </div>
        </div>
    )

}