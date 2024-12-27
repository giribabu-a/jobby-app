const mongoose = require("mongoose");

const jobbyUsersData = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    gender: {type: String, required: true},
    password: {type: String, required: true},
    designation: {type: String, required: true}
});

module.exports = mongoose.model('jobbyUsersData', jobbyUsersData);