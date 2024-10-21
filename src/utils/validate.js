

const validator = require('validator');


const validateSignupData=((req)=>{
    const {fistName,lastName,emailId,password}=req.body

    if(!fistName||lastName){
        throw new error("name is not valid")
        
    }else if
    (fistName.length<4||fistName.length>50){
            throw new error("firstName should be 4-50 charecter")

        }
    else    if (!validator.isEmail(emailId)) {
        throw new Error("emailId is not valid.");
    }  
      else    if (!validator.isPassword(password)) {
        throw new Error("password is not valid.");
    }

})


module.exports={validateSignupData}