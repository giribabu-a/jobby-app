import './Jobcard.css';
import { HiLocationMarker, HiMail, HiStar } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const JobCard = (props) => {

    const { JobDetails } = props;
    const { companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, rating, title, _id } = JobDetails;


    return (
        <Link to={`/jobs/${_id}`} className='job-card-details-link'>
            <div className='job-list-items'>

                <div className='logo-container'>
                    <div>
                        <img src={companyLogoUrl} className='company-logo'></img>
                    </div>
                    <div className='logo-heading-container'>
                        <div className='job-title'>{title}</div>
                        <div className='rating-container'>
                            <div className='rating-logo'>
                                <HiStar className='histar-icon' />
                                <p className='text-light'>{rating}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="loc-emptype-pack-container">
                    <div className="loc-emptype-container">
                        <div className="location-container">
                            <HiLocationMarker className="location-icon" />
                            <div className="">{location}</div>
                        </div>
                        <div className="emp-type-container">
                            <HiMail className="emptype-icon" />
                            <div className="">{employmentType}</div>
                        </div>
                    </div>
                    <div className="package-container">
                        <div className="">{packagePerAnnum}</div>
                    </div>
                </div>

                <hr className='line'></hr>
                <div className='desc-container'>
                    <h1 className='des-heading'>Description</h1>
                    <p className='job-description'>{jobDescription}</p>
                </div>
            </div>
        </Link>
    )
};

export default JobCard;