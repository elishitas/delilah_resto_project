const projectDatabase = require('../config/database');
const users_middlewares = {};

users_middlewares.requireRegisterData = async (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const address = req.body.address;

    if(typeof(userName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else if (typeof(fullName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the name provided'
        });
    } else if (typeof(email) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the email provided'
        });
    } else if (typeof(phoneNumber) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the phone number provided'
        });
    } else if (typeof(address) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the address provided'
        });
    } else {
        next();
    }
};

users_middlewares.requireLoginData = (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;

    if(typeof(userName) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the username provided'
        });
    } else if (typeof(password) !== 'string') {
        res.status(400).json({
            message: 'There was a problem with the password provided'
        });
    } else {
        next();
    }
};

users_middlewares.isDataValid = async (req, res, next) => {
    const userName = req.body.userName;
    const email = req.body.email;

    const isUserNameValid = await projectDatabase.usersModel.findOne({
        where: { userName: userName }
    }).catch(err => catchDatabaseEror(err, res));

    const isEmailValid = await projectDatabase.usersModel.findOne({
        where: { email: email }
    }).catch(err => catchDatabaseEror(err, res));

    if(isUserNameValid) {
        res.status(500).json({
            message: 'This username is already registered.'
        });
    } else if (isEmailValid) {
        res.status(500).json({
            message: 'This email is already registered.'
        });
    } else {
        next();
    }
};

//auxiliary functions
//I catch an error in the database
const catchDatabaseEror = (err, res) => {
    res.status(500).json({
        message: 'Hubo un error con la base de datos.',
        error: err
    });
};

module.exports = users_middlewares;