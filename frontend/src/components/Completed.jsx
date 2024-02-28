import React, {useState} from 'react';


export default function Completed() {
    const [text, setText] = useState("")

    return (
        <div className="challenges">
            <div class="form-group">
                <button class="btn btn-login" 
                        type="submit"
                        >Completed 1
                </button>
            </div>
            <div class="form-group">
                <button class="btn btn-login" 
                            type="submit"
                            >Completed 2
                </button>
            </div>
            <div class="form-group">
                <button class="btn btn-login" 
                            type="submit"
                            >Completed 3
                </button>
            </div>
        </div>
    )

}