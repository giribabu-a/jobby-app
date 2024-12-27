import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import AOS from "aos";
import "aos/dist/aos.css";

import './ProfileCard.css';
import Cookies from 'js-cookie';

const apiStatusConstant = {
    initial: "INITIAL",
    inProgress: "INPROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
};

const ProfileCard = ()=> {

    const [profile, setProfile] = useState({});
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);

    useEffect(()=> {
        getProfileDetails();
        AOS.init();
    }, []);

    const getProfileDetails = async ()=> {
        setApiStatus(apiStatusConstant.inProgress)

        let token = Cookies.get("jwtToken")
        const url = "http://localhost:4005/auth/profile"
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try{
            const response = await fetch(url, options)
            if(response.ok === true){
                const data = await response.json()
                setProfile(data.profile)
                setApiStatus(apiStatusConstant.success)
            }
            else{
                setApiStatus(apiStatusConstant.failure)
            }
        }
        catch(error){
            console.log(`Error at Profile Card API ${error}`)
            setApiStatus(apiStatusConstant.failure)
        }
    };

    const renderProfileDetails = ()=> {
        const {name, designation} = profile

        return(
            <div className='profile-container'>
                <img src='https://assets.ccbp.in/frontend/react-js/profile-img.png' className='profile-img' alt='profile'></img>
                <h1 className='profile-heading'>{name}</h1>
                <p className='profile-bio'>{designation}</p>
            </div>
        )
    };

    const renderLoader = ()=> {
        return(
            <div>
                <ThreeDots
                    height="100"
                    width="100"
                    radius="9"
                    color="white"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        )
    };

    const renderFailure = ()=> {
        return(
            <div className='failure-container'>
                <button type='button' className='retry-button'>Retry</button>
            </div>
        )
    };

    const profileCardSection = ()=> {
        switch(apiStatus){
            case apiStatusConstant.inProgress: return renderLoader();
            case apiStatusConstant.success: return renderProfileDetails();
            case apiStatusConstant.failure: return renderFailure();
            default: return null
        }
    };
    
    return(
        <div className='user-profile-card-container' data-aos="flip-left">
            {profileCardSection()}
        </div>
    )
};

export default ProfileCard;