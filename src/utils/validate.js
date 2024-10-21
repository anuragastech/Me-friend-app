const validator = require('validator');

const validateSignupData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("name is not valid");
    } else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("firstName should be 4-50 characters");
    }
    
    if (!validator.isEmail(emailId)) {
        throw new Error("emailId is not valid.");
    }
    
    if (!password || password.length < 8) {
        throw new Error("password is not valid.");
    }
};

module.exports = { validateSignupData };
