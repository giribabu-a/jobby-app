const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const { Jobs, jobDetails } = require('./Models/jobs');

const app = express();

const port = 4005 || process.env.PORT

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://giribabu83567:Giribabu8829@cluster0.93oh4kh.mongodb.net/jobbyApp?retryWrites=true&w=majority")
    .then(() => console.log('Database is connected'))
    .catch((error) => console.log(error))

//sending data to database
const addJobs = async () => {
    try {
        const jobDetail = new jobDetails({
            title: "Fullstack Developer",
            companyLogoUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
            companyWebsiteUrl: "https://about.google.com/",
            rating: 4,
            location: "Bangalore",
            packagePerAnnum: "14 LPA",
            employmentType: "Internship",
            jobDescription: "Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",
            skills: [
                {
                    name: "HTML 5",
                    imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
                },
                {
                    name: "CSS 3",
                    imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
                },
                {
                    name: "Javascript",
                    imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
                },
                {
                    name: "React JS",
                    imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
                },
                {
                    name: "Redux",
                    imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
                },
            ],
            lifeAtCompany: {
                description: `Our core philosophy is people over process. Our culture has been instrumental to our success. 
                                It has helped us attract and retain stunning colleagues, making work here more satisfying. 
                                Entertainment, like friendship, is a fundamental human need, and it changes how we feel and 
                                gives us common ground. We want to entertain the world.`,
                imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/life-facebook-img.png"
            }
        });
        const savedJobDetail = await jobDetail.save();

        const job = new Jobs({
            _id: savedJobDetail._id,
            title: "Fullstack Developer",
            companyLogoUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
            rating: 4,
            location: "Bangalore",
            packagePerAnnum: "14 LPA",
            employmentType: "Internship",
            jobDescription: "Google is and always will be an engineering company. We hire people with a broad set of technical skills who are ready to take on some of technology's greatest challenges and make an impact on millions, if not billions, of users. Google engineers are changing the world one technological achievement after another.",
        });
        await job.save()
        await mongoose.disconnect()
    }
    catch (error) {
        console.log(error, 'Error at Sending data to Db')
    }
};
// addJobs();

app.use("/auth", require('./Routes/authenticationRoutes'));
app.use("/api", require('./Routes/apiRoutes'))

app.listen(port, () => {
    console.log(`Server Running at ${port}`)
});

//name, email, mobile, gender,password, confirm password