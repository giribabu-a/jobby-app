import { useState, useEffect } from "react";
import { ThreeDots } from 'react-loader-spinner'
import { BsSearch } from 'react-icons/bs'

import "./JobsProfile.css";
import Cookies from "js-cookie";
import JobCard from "../JobCard/Jobcard";
import JobsFilter from "../JobsFilter/JobFilter";

const employmentTypesList = [
    {
        label: "Full Time",
        employmentTypeId: "FULL TIME"
    },
    {
        label: "Part Time",
        employmentTypeId: "PART TIME"
    },
    {
        label: "Internship",
        employmentTypeId: "INTERNSHIP"
    },
    {
        label: "Freelance",
        employmentTypeId: "FREELANCE"
    }
];

const salaryRangesList = [
    {
        salaryRangeId: '1000000',
        label: '10 LPA and Above'
    },
    {
        salaryRangeId: '2000000',
        label: '20 LPA and Above'
    },
    {
        salaryRangeId: '3000000',
        label: '30 LPA and Above'
    },
    {
        salaryRangeId: '4000000',
        label: '40 LPA and Above'
    }
];

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'INPROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
};

const JobProfile = () => {

    const [jobs, setJobs] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [empType, setEmpType] = useState([]);
    const [salRange, setSalRange] = useState(0);
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);

    useEffect(() => {
        getJobs();
    }, [empType, searchInput, salRange]);

    const getJobs = async () => {

        setApiStatus(apiStatusConstant.inProgress)

        var token = Cookies.get("jwtToken")
        const url = `http://localhost:4005/api/jobs?employmeny_type=${empType.join()}&minimum_package=${salRange}&search=${searchInput}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        try {
            const response = await fetch(url, options)
            if (response.ok === true) {
                const data = await response.json()
                setJobs(data.jobs)
                setApiStatus(apiStatusConstant.success)
            }
            else {
                setApiStatus(apiStatusConstant.failure)
            }
        }
        catch (error) {
            console.log(error)
            setApiStatus(apiStatusConstant.failure)
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchInput(event.target.value)
    };

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            getJobs()
        }
    };

    const onChangeSalary = (salary) => {
        setSalRange(salary)
    };

    const onChangeEmployment = (type) => {
        if (empType.includes(type)) {
            setEmpType(prev => prev.filter(item => item !== type)); // Remove the type if already present
        } else {
            setEmpType(prev => [...prev, type]); // Add the type if not present
        }
    };

    const renderSearchBar = () => {
        return (
            <div className="search-input">
                <input type="search"
                    placeholder="Search"
                    onChange={onChangeSearchInput}
                    className="search"
                    onKeyDown={onKeyDown}
                    value={searchInput}>
                </input>
                <button type="button" className="search-button" onClick={getJobs}>
                    <BsSearch className="search-icon" />
                </button>
            </div>
        )
    };

    const renderJobs = () => {

        return (jobs ?
            (<div>
                {
                    jobs.map((eachJob) => (
                        <JobCard key={eachJob._id} JobDetails={eachJob} />
                    ))
                }
            </div>)
            :
            (<div className="no-jobs-container">
                <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" className="no-jobs"></img>
                <h1 className="no-jobs-heading">No Jobs Found</h1>
                <p className="no-jobs-desc">We could not find any jobs. Try other filters</p>
            </div>)
        )
    };

    const renderFailure = () => (
        <div className="failure-container">
            <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="failure-view" />
            <h1 className="failure-heading">
                Oops Something Went Wrong
            </h1>
            <p className="failure-desc">We can't fing the page you are looking for.</p>
            <button type="button" className="retry-btn" onClick={getJobs}>
                Retry
            </button>
        </div>
    );

    const renderLoader = () => (
        <div className="loader-container">
            <ThreeDots
                height="150"
                width="200"
                radius="9"
                color="white"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
            />
        </div>
    );

    const renderJobProfilesStatus = () => {
        switch (apiStatus) {
            case apiStatusConstant.success: return renderJobs();
            case apiStatusConstant.inProgress: return renderLoader();
            case apiStatusConstant.failure: return renderFailure();
            default: return null
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="search-bar-container">
                        {renderSearchBar()}
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="render-group-items col-lg-4 col-md-12 col-sm-12">
                    <JobsFilter
                        EmpTypeList={employmentTypesList}
                        SalRangeList={salaryRangesList}
                        ChangeEmpType={onChangeEmployment}
                        empType={empType}
                        ChangeSal={onChangeSalary}
                        getJobs={getJobs} />
                </div>
                <div className="col-lg-8 col-md-12 col-sm-12">
                    {renderJobProfilesStatus()}
                </div>
            </div>
        </div>
    )
};

export default JobProfile;