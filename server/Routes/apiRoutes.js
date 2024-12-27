const express = require("express");
const router = express.Router();
const jwtAuthentication = require('../Middleware/jwtAuthentication');
const { Jobs, jobDetails } = require("../Models/jobs");

router.get("/", (request, response) => {
    response.send('API Routes')
});

//all jobs api with filters
router.get("/jobs", jwtAuthentication, async (request, response) => {
    try {
        const { search, minimum_package, employmeny_type } = request.query

        const query = {}
        if (employmeny_type) {
            const employmentTypesArray = employmeny_type.split(',')
            query.employmentType = { $in: employmentTypesArray.map(type => new RegExp(type, 'i')) }
        }
        if (minimum_package) {

            const minPackageValue = parseFloat(minimum_package.replace(/\D+/g, ''))
            if (!isNaN(minPackageValue)) {
                query.packagePerAnnum = { $gte: minPackageValue }
            }
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }

        const filteredJobs = await Jobs.find(query);
    
        if (filteredJobs.length === 0) {
            return response.json({ message: "No jobs found" })
        }
        return response.status(200).json({ jobs: filteredJobs })
    }
    catch (error) {
        console.log(error, "Jobs API")
        return response.status(500).json({ message: "Internal Server Error at All Jobs" })
    }
});

//individual and similar job details api
router.get("/jobdetails/:jobId", jwtAuthentication, async (request, response) => {
    try {
        const { jobId } = request.params
        const individualJob = await jobDetails.findOne({ _id: jobId })
    
        if (!individualJob) {
            return response.status(404).json({ message: "Job Not Found" })
        }

        const jobTitle = individualJob.title;
        const similarJobs = await Jobs.find({ 
            title:{ $regex: jobTitle, $options: 'i'}, _id: { $ne: jobId} 
        });
        return response.status(200).json({IndividualJob: individualJob, SimilarJobs: similarJobs})
    }
    catch (error) {
        console.log(error)
        return response.status(500).json({ message: "Internal Server Error at individual job details api" })
    }
});

module.exports = router;