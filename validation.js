const Joi = require("joi");


//signup Joi validation schema
const signUpValidation = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().min(2).max(200).required(),
        lastName: Joi.string().min(2).max(200).required(),
        email: Joi.string().min(4).max(200).required().email(),
        password: Joi.string().min(6).max(1000).required()
    })
    return schema.validate(data);
};

//signin Joi validation schema
const signInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).max(200).required().email(),
        password: Joi.string().min(6).max(1000).required()
    })
    return schema.validate(data)
};



//adminsignup Joi validation schema
const adSignUpValidation = (data) =>{
    const schema = Joi.object({
        idNumber: Joi.number().integer().required(),
        email: Joi.string().min(4).max(200).required().email(),
        password: Joi.string().min(6).max(1000).required()
    })
    return schema.validate(data);
};

//adminsignin Joi validation schema
const adSignInValidation = (data) => {
    const schema = Joi.object({
        idNumber: Joi.number().integer().required(),
        password: Joi.string().min(6).max(1000).required()
    })
    return schema.validate(data)
};



module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;
module.exports.adSignUpValidation = adSignUpValidation;
module.exports.adSignInValidation = adSignInValidation;
