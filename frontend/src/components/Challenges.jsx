import React, {useState} from 'react';


export default function Challenges() {
    const [text, setText] = useState("")

    return (
        <div className="challenges">
            <div class="form-group">
                <button class="btn btn-login" 
                        type="submit"
                        >CHALLENGE 1
                </button>
            </div>
            <div class="form-group">
                <button class="btn btn-login" 
                            type="submit"
                            >CHALLENGE 2
                </button>
            </div>
            <div class="form-group">
                <button class="btn btn-login" 
                            type="submit"
                            >CHALLENGE 3
                </button>
            </div>
        </div>
    )

}