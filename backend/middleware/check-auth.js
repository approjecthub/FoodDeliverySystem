const jwt = require('jsonwebtoken')

function authenticate(req, res, next){
    try{
        const token = req.headers.authorization.split(' ')[1]

        const decodedToken = jwt.verify(token, 'SECRET_key')

        req.userdetails = {userid:decodedToken.id, userRole: decodedToken.role}
        next()
    }
    catch(err){
        res.status(401).json({msg: "Auth failed"})
    }
}

module.exports = authenticate