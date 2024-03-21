import React, {useState, useContext} from 'react';

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

import axios from "axios"
import { IPContext } from "../App.js"


export default function PlantSelector(props) {
    let plantList = []
    let userPlants = []

    try {
        props.plantList.map((plant) => {
            plantList.push(plant)
        })
    } catch(e) {
        console.log("no plants in garden rn")
    }
    try {
        props.userPlants.map((plant) => {
            console.log(plant)
            userPlants.push(plant.plant_type)})
    } catch(e) {
        console.log("user owns no plants")
    }

    const BB_D_P = userPlants.includes('BB_Deep') ? true : false
    const BB_L_P = userPlants.includes('BB_Lilac') ? true : false
    const BB_P_P = userPlants.includes('BB_Pale') ? true : false
    const MG_O_P = userPlants.includes('Marigold_Orange') ? true : false
    const MG_R_P = userPlants.includes('Marigold_Red') ? true : false
    const MG_Y_P = userPlants.includes('Marigold_Yellow') ? true : false
    const T_O_P = userPlants.includes('Tulip_Orange') ? true : false
    const T_P_P = userPlants.includes('Tulip_Pink') ? true : false
    const T_R_P = userPlants.includes('Tulip_Red') ? true : false
    const T_Y_P = userPlants.includes('Tulip_Yellow') ? true : false
    const S_P = userPlants.includes('Sunflower') ? true : false

    const [BB_D_P_D, setBB_D_P_D] = useState(plantList.includes('BB_Deep') ? true : false)
    const [BB_L_P_D, setBB_L_P_D] = useState(plantList.includes('BB_Lilac') ? true : false)
    const [BB_P_P_D, setBB_P_P_D] = useState(plantList.includes('BB_Pale') ? true : false)
    const [MG_O_P_D, setMG_O_P_D] = useState(plantList.includes('Marigold_Orange') ? true : false)
    const [MG_R_P_D, setMG_R_P_D] = useState(plantList.includes('Marigold_Red') ? true : false)
    const [MG_Y_P_D, setMG_Y_P_D] = useState(plantList.includes('Marigold_Yellow') ? true : false)
    const [T_O_P_D, setT_O_P_D] = useState(plantList.includes('Tulip_Orange') ? true : false)
    const [T_P_P_D, setT_P_P_D] = useState(plantList.includes('Tulip_Pink') ? true : false)
    const [T_R_P_D, setT_R_P_D] = useState(plantList.includes('Tulip_Red') ? true : false)
    const [T_Y_P_D, setT_Y_P_D] = useState(plantList.includes('Tulip_Yellow') ? true : false)
    const [S_P_D, setS_P_D] = useState(plantList.includes('Sunflower') ? true : false)

    const IP = useContext(IPContext)

    function addBB_Deep() {
        if (BB_D_P_D) {
            const index = plantList.findIndex(item => item === 'BB_Deep')
            const updatedList = [...plantList]
            console.log(updatedList, "list 1")
            updatedList.splice(index, 1);
            console.log(updatedList, "List2")
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setBB_D_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setBB_D_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('BB_Deep')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addBB_Lilac() {
        if (BB_L_P_D) {
            const index = plantList.findIndex(item => item === 'BB_Lilac')
            const updatedList = [...plantList]
            console.log(updatedList, "list 1")
            updatedList.splice(index, 1);
            console.log(updatedList, "List2")
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            debugger;
            props.setPlantList(json)
            setBB_L_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            console.log(plantList, "is plant list")
            setBB_L_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('BB_Lilac')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            debugger;
            props.setPlantList(json)
        }
    }

    function addBB_Pale() {
        if (BB_P_P_D) {
            const index = plantList.findIndex(item => item === 'BB_Pale')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setBB_P_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setBB_P_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('BB_Pale')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            debugger;

            props.setPlantList(json)
            debugger;

        }
    }

    function addMarigold_Orange() {
        if (MG_O_P_D) {
            const index = plantList.findIndex(item => item === 'Marigold_Orange')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setMG_O_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setMG_O_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Marigold_Orange')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addMarigold_Red() {
        if (MG_R_P_D) {
            const index = plantList.findIndex(item => item === 'Marigold_Red')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setMG_R_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setMG_R_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Marigold_Red')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addMarigold_Yellow() {
        if (MG_Y_P_D) {
            const index = plantList.findIndex(item => item === 'Marigold_Yellow')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setMG_Y_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setMG_Y_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Marigold_Yellow')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            debugger;

            props.setPlantList(json)
            debugger;

        }
    }

    function addTulip_Orange() {
        if (T_O_P_D) {
            const index = plantList.findIndex(item => item === 'Tulip_Orange')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setT_O_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setT_O_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Tulip_Orange')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addTulip_Pink() {
        if (T_P_P_D) {
            const index = plantList.findIndex(item => item === 'Tulip Pink')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setT_P_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setT_P_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Tulip_Pink')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addTulip_Red() {
        if (T_R_P_D) {
            const index = plantList.findIndex(item => item === 'Tulip_Red')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setT_R_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setT_R_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Tulip_Red')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addTulip_Yellow() {
        if (T_Y_P_D) {
            const index = plantList.findIndex(item => item === 'Tulip_Yellow')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setT_Y_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setT_Y_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Tulip_Yellow')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function addSunflower() {
        if (S_P_D) {
            const index = plantList.findIndex(item => item === 'Sunflower')
            const updatedList = [...plantList]
            updatedList.splice(index, 1);
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
            setS_P_D(false)
        } else if (props.plantList.length == 3) {
            console.log("Plant list full")
        } else {
            setS_P_D(true)
            const updatedList = [...plantList]
            updatedList.push('Sunflower')
            let json = {
                plant1: updatedList[0],
                plant2: updatedList[1],
                plant3: updatedList[2]
            }
            props.setPlantList(json)
        }
    }

    function nothing() {
    }

    function saveGarden() {
        axios.post(`http://${IP}:8000/garden/garden-data/update/`, {
            body: {"garden_layout": {
                plant1: plantList[0],
                plant2: plantList[1],
                plant3: plantList[2],
            }}
        })
    }

    return (
        <div className="plant-pick-container">
            <div className="plant-row-1">
                <img src={BB_Deep} alt="Bluebell Deep Blue" onClick={BB_D_P ? addBB_Deep : nothing} className={BB_D_P ? (BB_D_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={BB_Lilac} alt="Bluebell Lilac" onClick={BB_L_P ? addBB_Lilac : nothing} className={BB_L_P ? (BB_L_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={BB_Pale} alt="Bluebell Pale Blue" onClick={BB_P_P ? addBB_Pale : nothing}  className={BB_P_P ? (BB_P_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
            </div>
            <div className="plant-row-2">
                <img src={Marigold_Orange} alt="Marigold Orange" onClick={MG_O_P ? addMarigold_Orange : nothing} className={MG_O_P ? (MG_O_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={Marigold_Red} alt="Marigold Red" onClick={MG_R_P ? addMarigold_Red : nothing} className={MG_R_P ? (MG_R_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={Marigold_Yellow} alt="Marigold Yellow" onClick={MG_Y_P ? addMarigold_Yellow : nothing} className={MG_Y_P ? (MG_Y_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
            </div>
            <div className="plant-row-3">
                <img src={Tulip_Orange} alt="Tulip Orange" onClick={T_O_P ? addTulip_Orange : nothing} className={T_O_P ? (T_O_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={Tulip_Pink} alt="Tulip Pink" onClick={T_P_P ? addTulip_Pink : nothing} className={T_P_P ? (T_P_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={Tulip_Red} alt="Tulip Red" onClick={T_R_P ? addTulip_Red : nothing} className={T_R_P ? (T_R_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
            </div>
            <div className="plant-row-4">
                <img src={Tulip_Yellow} alt="Tulip Yellow" onClick={T_Y_P ? addTulip_Yellow : nothing} className={T_Y_P ? (T_Y_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
                <img src={Sunflower} alt="Sunflower" onClick={S_P ? addSunflower : nothing} className={S_P ? (S_P_D ? 'plant-img-selected' :'plant-img') :'plant-img-unowned'}></img>
            </div>
            <button className="btn" id="save-garden-btn" onClick={saveGarden}>SAVE</button>
        </div>
    )

}