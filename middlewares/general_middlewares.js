const JWT = require('jsonwebtoken');
const JWTSign = 'mySUPERpass.12';
const general_middlewares = {};

general_middlewares.checkBody = (req, res, next) => {
    if(isObjEmpty(req.body)) {
        console.log('Body cannot be empty');
        res.status(400).json({
            message: 'There was a problem with the information provided'
        });
    } else {
        next();
    }
};

general_middlewares.validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    const tokenVerified = JWT.verify(token, JWTSign, (error, decoded) => {
        if(error) {
            res.status(401).json({
                message: 'Unable to verify the token.',
                error
            });
        } else {
            res.locals.userPayload = decoded;
            next();
        }
    });
};

//this

general_middlewares.isAdminUser = (req, res, next) => {
    if(res.locals.userPayload.isAdmin === false) {
        res.status(403).json({
            message: 'Permition denied.'
        });
    } else {
        next();
    }
};

//auxiliary functions
function isObjEmpty(obj) {
    return Object.entries(obj).length === 0;
}

module.exports = general_middlewares;