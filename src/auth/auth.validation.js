const { Joi } = require('express-validation')
const registerValidation = {
    body: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        //must have two domain parts e.g. example.com
        //TLD must be .com or .net
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
    })
}
const loginValidation = {
    body: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    })
}
const changePasswordValidation = {
    body: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
        newPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    })
}
const updateValidation = {
    body: Joi.object({
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        name: Joi.string()
            .min(3)
            .max(30)
            .required()
    })
}
const forgotPasswordValidation = {
    body: Joi.object({
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    })
}

const resetPasswordValidation = {
    body: Joi.object({
        newPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),
    })
}
module.exports = {
    registerValidation,
    loginValidation,
    changePasswordValidation,
    updateValidation,
    forgotPasswordValidation,
    resetPasswordValidation
};