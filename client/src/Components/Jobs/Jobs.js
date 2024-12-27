import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Jobs.css';
import Header from '../Header/Header';
import Cookies from 'js-cookie';
import JobProfile from '../JobProfileSection/JobsProfile';

const Jobs = () => {

    let navigate = useNavigate();
    useEffect(() => {
        let token = Cookies.get("jwtToken")
        if (token === undefined) {
            navigate("/auth")
        }
    });


    return (
        <>
            <Header />
            <div className='jobs-profile-container'>
                <div className='container'>
                    <JobProfile />
                </div>
            </div>
        </>
    )
};

export default Jobs;