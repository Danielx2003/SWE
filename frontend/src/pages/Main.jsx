import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Profile from "../components/Profile"
import PlantSelector from "../components/PlantSelector"

import BB_Deep from "../res/Bluebell Deep.png"
import BB_Lilac from "../res/Bluebell Lilac.png"
import BB_Pale from "../res/Bluebell Pale.png"
import Marigold_Orange from "../res/Marigold Orange.png"
import Marigold_Red from "../res/Marigold Red.png"
import Marigold_Yellow from "../res/Marigold Yellow.png"
import Tulip_Orange from "../res/Tulip_Orange.png"
import Tulip_Pink from "../res/Tulip_Pink.png"
import Tulip_Red from "../res/Tulip_Red.png"
import Tulip_Yellow from "../res/Tulip_Yellow.png"
import Sunflower from "../res/Sunflower Cropped3.png"

import axios from 'axios';

import GetWeatherBackground from '../components/GetWeatherBackground';
import { IPContext } from "../App.js"
import ChallengeModal from '../components/ChallengeModal.jsx';


export default function Main() {
    axios.defaults.withCredentials = true;

    const [authState, setAuthState] = useState("Profile");
    const [challenges, setChallenges] = useState([])
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();
    const IP = useContext(IPContext)

    //delete after its just template
    const [userPlants, setUserPlants] = useState([])
    const [plantList, setPlantList] = useState([])


    useEffect(() => {
        if (!Cookies.get('username')) {
            navigate('/login')
        }

        const getUserData = async() => {
            axios.get(`http://${IP}:8000/garden/garden-data/`,
            {
                'withCredentials': true,
            }
            )
            .then(response => {
                console.log(response, "Is resp")
                setUserData(response.data.garden_info)
                // setUserPlants(response.data.garden_info.plants)
                setUserPlants(['BB_Deep','Sunflower'])
                // setPlantList(response.data.garden_layout)
                setPlantList([Sunflower])
              })
            .catch(error => {
                console.log("Errror getting user data.")
              });

        }
        const getChallengeData = async() => {
            axios.get(`http://${IP}:8000/qrcodes/challenges`,
            {
                'withCredentials': true,
            }
            )
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
    
    function hideImg3() {
        document.getElementById("sunflower-img-3").style.display = "none";
        document.getElementById("plant-3").style.display = "none";
    }

    function hideImg2() {
        document.getElementById("sunflower-img-2").style.display = "none";
        document.getElementById("plant-2").style.display = "none";
    }

    function hideImg1() {
        document.getElementById("sunflower-img-1").style.display = "none";
        document.getElementById("plant-1").style.display = "none";
    }
    //maybe change src={plantList[0]} to become the route
    //i.e. src=`../res/${plantList[0]}.png ?
    return (
        <div className="main--container">
        <div className="parent">
            <div className="plants">
                <img id={plantList[0] == Sunflower ? "sunflower-img-1" : "plant-1"} onError={hideImg1} src={plantList[0]} alt={plantList[0]}></img>
                <img id={plantList[1] == "Sunflower" ? "sunflower-img-2" : "plant-2"} onError={hideImg2} src={plantList[1]} alt={plantList[1]}></img>
                <img id={plantList[2] == "Sunflower" ? "sunflower-img-3" : "plant-3"} onError={hideImg3} src={plantList[2]} alt={plantList[2]}></img>
              </div>
            <GetWeatherBackground id="background-img"/>
        </div>
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
                        {authState=="Challenges" ? challenges.map((challenge) => <ChallengeModal key={challenge.id} 
                                                                                            info={challenge}
                                                                                            open={open}
                                                                                            setOpen={setOpen}
                                                                                            />)
                        : authState=="Profile" ? <Profile userData={userData}/> : <PlantSelector 
                                                                                    plantList={plantList} 
                                                                                    setPlantList={setPlantList}
                                                                                    userPlants={userPlants}/>}
                    </section>
                </div>
            </div>
        </div>

    )
}