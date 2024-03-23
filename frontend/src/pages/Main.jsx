import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Profile from "../components/Profile"
import PlantSelector from "../components/PlantSelector"
import CheckNotForAdmin from '../components/CheckNotForAdmin.jsx';

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
    const dict = {
        'BB_Deep': BB_Deep,
        'BB_Lilac' : BB_Lilac,
        'BB_Pale': BB_Pale,
        'Marigold_Orange': Marigold_Orange,
        'Marigold_Red': Marigold_Red,
        'Marigold_Yellow': Marigold_Yellow,
        'Tulip_Orange': Tulip_Orange,
        'Tulip_Pink': Tulip_Pink,
        'Tulip_Red': Tulip_Red,
        'Tulip_Yellow': Tulip_Yellow
    }
    const [authState, setAuthState] = useState("Profile");
    const [challenges, setChallenges] = useState([])
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();
    const IP = useContext(IPContext)
    const [userPlants, setUserPlants] = useState([])
    const [plantList, setPlantList] = useState([])

    useEffect(() => {
        if (!Cookies.get('username')) {
            navigate('/login');
        }
    
        // Get garden data of currently authenticated user
        const getUserData = async () => {
            axios.get(`http://${IP}:8000/garden/garden-data/`, {
                'withCredentials': true,
            })
            .then(response => {
                setUserData(response.data.garden_info);
                setUserPlants(response.data.garden_info.plants);
                setPlantList(response.data.garden_layout);
            })
            .catch(error => {
                console.log("Error getting user data.");
            });
        };
    
        // If user is not currently logged in, send them to the login page
        if (!Cookies.get('sessionid')) {
            navigate('/login');
        }
    
        // Get challenge data from API
        const getChallengeData = async () => {
            axios.get(`http://${IP}:8000/qrcodes/challenges`, {
                'withCredentials': true,
            })
            .then(response => {
                setChallenges(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        };
    
        getUserData();
        getChallengeData();
    }, []);


    //maybe change src={plantList[0]} to become the route
    //i.e. src=`../res/${plantList[0]}.png ?
    function plant1ID() {
        try {
            return dict[plantList.plant1]
        } catch(e) {
            return false
        }
    }
    function plant2ID() {
        try {
            return dict[plantList.plant2]
        } catch(e) {
            return false
        }
    }
    function plant3ID() {
        try {
            return dict[plantList.plant3]
        } catch(e) {
            return false
        }
    }
    //maybe change src={plantList[0]} to become the route
    //i.e. src=`../res/${plantList[0]}.png ?
    return (
        <>
        <CheckNotForAdmin />
        <div className="main--container">
        {/* Background jumbotron generator using weather API */}
        <div className="parent">
            <div className="plants">
                <img id={plant1ID() == Sunflower ? "sunflower-img-1" : "plant-1"} src={plant1ID()} alt={plant1ID()}></img>
                <img id={plant2ID() == Sunflower ? "sunflower-img-2" : "plant-2"} src={plant2ID()} alt={plant2ID()}></img>
                <img id={plant3ID() == Sunflower ? "sunflower-img-3" : "plant-3"} src={plant3ID()} alt={plant3ID()}></img>
              </div>
            <GetWeatherBackground id="background-img"/>
        </div>

        {/* Container for game actions i.e. challenges, stats */}
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
        </>
    )
}