import './SimilarJobs.css';
import { HiStar } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

const SimilarJobs = (props)=> {

    const {SimilarJobDetails} = props;
    const { companyLogoUrl, employmentType, jobDescription, location, packagePerAnnum, rating, title } = SimilarJobDetails;

    return(
        <div className='similar-job-container'>
            <div className='logo-container'>
                <div>
                    <img src={companyLogoUrl} className='company-logo'></img>
                </div>
                <div className='logo-heading-container'>
                    <div className='similar-job-title'>{title}</div>
                    <div className='rating-container'>
                        <div className='rating-logo'>
                            <HiStar className='histar-icon'/>
                            <p>{rating}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h1 className='descr-heading'>Description</h1>
                <p className='similar-job-desc'>{jobDescription}</p>
            </div>

            <div className='loc-emptype-container'>
                <div className='location-container'>
                    <FaLocationDot className='loc-dot-icon'/>
                    <div>{location}</div>
                </div>
                <div className='location-container'>
                    <MdMail className='loc-dot-icon'/>
                    <div>{employmentType}</div>
                </div>
            </div>
        </div>
    )
};

export default SimilarJobs;