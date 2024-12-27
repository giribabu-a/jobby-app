import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './Home.css';
import Header from '../Header/Header';

const Home = ()=> {
    
    let navigate = useNavigate();
    useEffect(()=> {
        let token = Cookies.get("jwtToken")
        if(token === undefined){
            navigate("/auth")
        }
    });

    return(
       <>
            <Header/>
            <div className='home-page-container'>
                <div className='home-content'>
                    <h1 className='main-heading'>Find the Job That fits your life</h1>
                    <p className='description'>
                        Millions of people are searching for jobs, salary information, company reviews.
                        Find the job that fits your abilities and potential.
                    </p>
                    <Link to={"/jobs"}>
                        <button type='button' className='find-jobs-btn'>
                            Find Jobs
                        </button>
                    </Link>
                </div>
            </div>
       </>
    )
};

export default Home;