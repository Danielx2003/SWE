import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Profile from "../components/Profile"
import PlantSelector from "../components/PlantSelector"

import axios from 'axios';

import GetWeatherBackground from '../components/GetWeatherBackground';
import { IPContext } from "../App.js"
import ChallengeModal from '../components/ChallengeModal.jsx';


export default function Main() {
    axios.defaults.withCredentials = true;

    const [authState, setAuthState] = useState(false);
    const [challenges, setChallenges] = useState([])
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();
    const IP = useContext(IPContext)


    useEffect(() => {
        if (!Cookies.get('sessionid')) {
            navigate('/login')
        }

        const getUserData = async() => {
            axios.get(`http://${IP}:8000/garden/garden-data/`)
            .then(response => {
                setUserData(response.data)
              })
            .catch(error => {
                console.log("Errror getting user data.")
              });

        }
        const getChallengeData = async() => {
            axios.get(`http://${IP}:8000/qrcodes/challenges`)
            .then(response => {
                setChallenges(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        getUserData()
        getChallengeData()
    }, [])
    

    return (
        <div className="main--container">
        <GetWeatherBackground />
            <div className="garden--container">
                <div className="choice--container">
                    <div id="auth-buttons" className="auth-button-controller d-flex w-100 flex-row">
                        <a id="left-auth" onClick={() => setAuthState("Challenges")} className="auth-button d-flex w-50 justify-content-center border-end"><h4 className="form-title mb-0" style={{fontWeight : authState=="Challenges" ? 'bold' : ""}}>Challenges</h4></a>
                        <a id="right-auth" onClick={() => setAuthState("Profile")} className="auth-button d-flex w-50 justify-content-center border-end"><h4 className="form-title mb-0" style={{fontWeight : authState=="Profile" ? 'bold' : ''}}>Profile</h4></a>
                        <a id="right-auth" onClick={() => setAuthState("Plants")} className="auth-button d-flex w-50 justify-content-center"><h4 className="form-title mb-0" style={{fontWeight : authState=="Plants" ? 'bold' : ''}}>Garden</h4></a>
                        <label type="hidden"></label>
                    </div>
                    <hr className="mt-0 mb-4"></hr>
                    <section id="auth">
                        {authState=="Challenges" ? 
                        challenges.map((challenge) => 
                            <ChallengeModal 
                                key={challenge.id} 
                                info={challenge} 
                            />
                        )
                        : authState=="Profile" ? <Profile userData={userData}/> : <PlantSelector/>}
                    </section>
                </div>
            </div>
        </div>

    )
}