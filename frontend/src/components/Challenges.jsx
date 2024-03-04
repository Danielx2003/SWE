import React, {useState} from 'react';
import ChallengeDetails from "./ChallengeDetails"

export default function Challenges(props) {
    const [visible, setVisible] = useState(false)

    function showDetails(e) {
        console.log("showing details")
        e.preventDefault()
        if (!props.open) {
            setVisible(true)
            props.setOpen(true)
        } else {
            console.log("too many open")
        }
    }

    return (
        <div className="form-group">
            <button class="btn btn-login" 
                    onClick={showDetails}
                    >{props.info.name}
            </button>
            {visible ? <ChallengeDetails key={props.id} 
                                            info={props.info} 
                                            visible={visible} 
                                            setVisible={setVisible} 
                                            setOpen={props.setOpen}
                                            /> : null}

        </div>
    )

}