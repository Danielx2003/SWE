import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Completed from "../components/Completed"
import Challenges from "../components/Challenges"
import Profile from "../components/Profile"
import axios from 'axios';

export default function Main() {
    axios.defaults.withCredentials = true;

    const [authState, setAuthState] = useState(false);
    const [challenges, setChallenges] = useState([{id: 1, name:"test1",reward:"200 xp"}])
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getUserData = async() => {
            axios.get("http://localhost:8000/garden/garden-data/")
            .then(response => {
                setUserData(response.data)
              })
            .catch(error => {
                alert("Error getting user data");
              });

        }
        getUserData()
    }, [])
    
    return (
        <div className="main--container">
            <img className="garden--img" src="https://i0.wp.com/fuentespens.ink/wp-content/uploads/2020/04/IMG_5412.jpeg?w=828&ssl=1"></img>
            <div className="garden--container">
                <div className="choice--container">
                    <div id="auth-buttons" class="auth-button-controller d-flex w-100 flex-row">
                        <a id="left-auth" onClick={() => setAuthState("Challenges")} class="auth-button d-flex w-50 justify-content-center border-end"><h4 class="form-title mb-0">Challenges</h4></a>
                        <a id="right-auth" onClick={() => setAuthState("Completed")} class="auth-button d-flex w-50 justify-content-center border-end"><h4 class="form-title mb-0">Completed</h4></a>
                        <a id="right-auth" onClick={() => setAuthState("Profile")} class="auth-button d-flex w-50 justify-content-center"><h4 class="form-title mb-0">Profile</h4></a>
                        <label type="hidden"></label>
                    </div>
                    <hr class="mt-0 mb-4"></hr>
                    <section id="auth">
                        {authState=="Challenges" ? challenges.map((challenge) => <Challenges key={challenge.id}/>) : authState=="Completed" ? <Completed/> : <Profile/>}
                    </section>
                </div>
            </div>
        </div>

    )
}