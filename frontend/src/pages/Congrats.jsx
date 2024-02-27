import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation  } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function Congrats(props) {
    const [prize, setPrize] = useState("200XP")
    const [image, setImage] = useState("https://img.freepik.com/premium-vector/plant-pixel-art-style_475147-1478.jpg?w=996")
    
    const navigate = useNavigate();
    let location = useLocation();

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const code = queryParams.get('code');

    useEffect(() => {
        if (!Cookies.get('sessionid')) {
            props.setRedirectQR({qr: true, path:`/qr${location.search}`})
            navigate('/login')
        }
        const getDetails = async () => {
            //now use the code variable to make a request to the backend.
            //then can display what the user has won
            //are we going to store all the qr codes the user has scanned?
            //do i need to pass the username to check this?
            console.log("the code is",code)
            if (!code) {
                alert('Invalid code used!')
                navigate('/main')
            }
        }
        getDetails()
    },[])

    function closePage(e) {
        e.preventDefault()
        navigate('/main')
    }

    return (
        <div id="congrats--container">
            <div id="congrats--form">
                <form className="">
                    <h4 className="form-title">Congratulations!</h4>
                    <div className="form-group">
                    </div>
                    <img id="congrats--img" src={image} alt="plant"></img>
                    <h4 className="form-title">You have won {prize}!</h4>
                    <button
                        className="btn btn-login"
                        id="btn--override"
                        onClick={closePage}
                    >Close</button>
                </form>
                <hr />
            </div>
        </div>
    )
}