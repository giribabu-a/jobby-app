const mongoose = require("mongoose")

const {Schema} = mongoose;

const skillsSchema = new mongoose.Schema({
    name: String,
    imageUrl: String
});

const lifeAtCompanySchema = new mongoose.Schema({
    description: String,
    imageUrl: String
});

const jobSchema = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String
});
const Jobs = mongoose.model("Jobs", jobSchema);

const jobDetailsSchema = new mongoose.Schema({
    title: String,
    companyLogoUrl: String,
    companyWebsiteUrl: String,
    rating: Number,
    location: String,
    packagePerAnnum: String,
    jobDescription: String,
    employmentType: String,
    skills: [skillsSchema],
    lifeAtCompany: lifeAtCompanySchema
});
const jobDetails = mongoose.model("jobDetails", jobDetailsSchema);

module.exports = { Jobs, jobDetails };