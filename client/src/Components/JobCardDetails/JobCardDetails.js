import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { HiStar, HiLocationMarker, HiMail } from "react-icons/hi";
import { TbExternalLink } from "react-icons/tb";

import './JobCardDetails.css';
import Cookies from 'js-cookie';
import Header from '../Header/Header';
import SkillsCard from '../SkillsCard/Skills';
import SimilarJobs from '../SimilarJobs/SimilarJobs';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

const JobCardDetails = () => {

    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [jobDetails, setJobDetails] = useState({})
    const [similarJobs, setSimilarJobs] = useState([]);
    const [skillsArray, setSkillsArray] = useState([])
    const [lifeAtCom, setLifeAtCom] = useState({})

    let navigate = useNavigate()
    useEffect(() => {
        let token = Cookies.get("jwtToken")
        if (token === undefined) {
            navigate("/auth")
        };

        getJobDetails()
    }, []);

    let jobId = useParams()
    const getJobDetails = async () => {

        setApiStatus(apiStatusConstant.inProgress)

        let token = Cookies.get("jwtToken")
        const url = `http://localhost:4005/api/jobdetails/${jobId.jobId}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, options)
        if (response.ok === true) {
            const data = await response.json()

            setJobDetails(data.IndividualJob);
            setSkillsArray(data.IndividualJob.skills)
            setLifeAtCom(data.IndividualJob.lifeAtCompany)

            setSimilarJobs(data.SimilarJobs)
            setApiStatus(apiStatusConstant.success)

        }
        else {
            setApiStatus(apiStatusConstant.failure)
        }
    };

    const renderFailure = () => (
        <div className="failure-container">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="failure-view" />
            <h1 className="failure-heading">
                Oops Something Went Wrong
            </h1>
            <p className="failure-desc">We can't fing the page you are looking for.</p>
            <button type="button" className="retry-btn" onClick={getJobDetails}>
                Retry
            </button>
        </div>
    );

    const renderLoader = () => (
        <div className="loader-container">
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
    );

    const renderJobItemDetails = () => {

        const { companyLogoUrl, companyWebsiteUrl, employmentType, jobDescription, location, packagePerAnnum, rating, title } = jobDetails;

        return (
            <div className='full-job-item-container'>
                <div className='job-items-container'>

                    <div className='logo-container'>
                        <div>
                            <img src={companyLogoUrl} className='company-logo'></img>
                        </div>
                        <div className='logo-heading-container'>
                            <div className='job-title'>{title}</div>
                            <div className='rating-container'>
                                <div className='rating-logo'>
                                    <HiStar className='histar-icon' />
                                    <p>{rating}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="jcd-loc-emp-pack-container">
                        <div className="jcd-loc-emp-container">
                            <div className="jcd-location-container">
                                <HiLocationMarker className="jcd-location-icon" />
                                <div className="">{location}</div>
                            </div>
                            <div className="jcd-emptype-container">
                                <HiMail className="jcd-empType-icon" />
                                <div className="">{employmentType}</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="">{packagePerAnnum}</div>
                        </div>
                    </div>

                    <hr className='line'></hr>
                    <div className="description-container">
                        <h1 className="desc-heading">Description</h1>
                        <a className="visit-link" href={companyWebsiteUrl}>
                            Visit
                            <TbExternalLink className="bi-link" />
                        </a>
                    </div>
                    <p className='job-des'>{jobDescription}</p>

                    <div className='d-flex flex-column my-5'>
                        <h1 className='skill-heading'>Skills</h1>
                        <div className='sills-card-container'>
                            {
                                skillsArray.map((eachSkill) => (
                                    <SkillsCard SkillsDetails={eachSkill} />
                                ))
                            }
                        </div>
                    </div>

                    <div className='my-5'>
                        <h1 className='life-at-heading'>Life At Company</h1>
                        <div className='row life-at-company-container'>
                            <div className='col-lg-7 col-md-12 col-sm-12 lifeatcom-desc'>
                                {lifeAtCom.description}
                            </div>
                            <div className='col-lg-4 col-md-12 col-sm-12 lifeatcom-image'>
                                <img src={lifeAtCom.imageUrl} alt='life at company logo' className='lifeat-logo'></img>
                            </div> 
                        </div>
                    </div>

                    <div>
                        <h1 className='similar-job-heading'>Similar Jobs</h1>
                        <div className='d-flex flex-wrap'>
                            {
                                similarJobs.map((eachSimilar) => (
                                    <SimilarJobs SimilarJobDetails={eachSimilar} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    // const renderJobDetailsStatus = ()=> {
    //     switch(apiStatus){
    //         case apiStatusConstant.inProgress: return renderLoader();
    //         case apiStatusConstant.failure: return renderFailure();
    //         case apiStatusConstant.success: return renderJobDetailsStatus();
    //         default: return null
    //     }
    // };

    return (
        <>
            <Header />
            <div className='job-card-details-container'>
                {renderJobItemDetails()}
            </div>
        </>
    )
};

export default JobCardDetails;