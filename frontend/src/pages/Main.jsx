import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Challenges from "../components/Challenges"
import Profile from "../components/Profile"
import axios from 'axios';

import { IPContext } from "../App.js"


export default function Main() {
    axios.defaults.withCredentials = true;

    const [authState, setAuthState] = useState(false);
    const [challenges, setChallenges] = useState([])
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false)

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
            <img className="garden--img" src="https://i0.wp.com/fuentespens.ink/wp-content/uploads/2020/04/IMG_5412.jpeg?w=828&ssl=1"></img>
            <div className="garden--container">
                <div className="choice--container">
                    <div id="auth-buttons" className="auth-button-controller d-flex w-100 flex-row">
                        <a id="left-auth" onClick={() => setAuthState("Challenges")} className="auth-button d-flex w-50 justify-content-center border-end"><h4 className="form-title mb-0">Challenges</h4></a>
                        <a id="right-auth" onClick={() => setAuthState("Profile")} className="auth-button d-flex w-50 justify-content-center"><h4 className="form-title mb-0">Profile</h4></a>
                        <label type="hidden"></label>
                    </div>
                    <hr className="mt-0 mb-4"></hr>
                    <section id="auth">
                        {authState=="Challenges" ? challenges.map((challenge) => <Challenges key={challenge.id} 
                                                                                            info={challenge}
                                                                                            open={open}
                                                                                            setOpen={setOpen}
                                                                                            />)
                                                                                             : <Profile userData={userData}/>}
                    </section>
                </div>
            </div>
        </div>

    )
}