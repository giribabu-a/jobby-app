const jwt = require('jsonwebtoken')

const jwtAuthentication = (request, response, next)=> {

    let jwtToken;

    const authenticationHeaders = request.headers['authorization']
    
    if(authenticationHeaders !== undefined){
        jwtToken = authenticationHeaders.split(" ")[1]
    }

    if(authenticationHeaders === undefined){
        return response.status(401).json({message: "Invalid JSON Web Token"})
    }
    
    else{
        
        jwt.verify(jwtToken, 'GIRI_SECRETE_KEY', async (error, payload)=> {
            if(error)
            {
                return response.status(401).json({message: 'Error at Token Verification'})
            }
            else
            {
                request.id = payload.userId
                next()
            }
        })
    }
};

module.exports = jwtAuthentication;