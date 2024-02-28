import React, {useState} from 'react';
import ChallengeDetails from "./ChallengeDetails"

export default function Challenges(props) {
    const [visible, setVisible] = useState(false)

    function showDetails(e) {
        e.preventDefault()
        setVisible(true)
    }

    return (
        <div class="form-group">
            <button class="btn btn-login" 
                    onClick={showDetails}
                    >CHALLENGE 1
            </button>
            {visible ? <ChallengeDetails key={props.id} visible={visible} setVisible={setVisible}/> : null}

        </div>
    )

}