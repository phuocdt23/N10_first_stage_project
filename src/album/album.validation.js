const { Joi } = require('express-validation')

const createValidate = {
    body: Joi.object({
        name: Joi.string()
            .alphanum()
            .max(30)
            .required(),
        description: Joi.string()
            .required()
    })
}
const updateValidate = {
    body: Joi.object({
        name: Joi.string()
            .alphanum()
            .max(30),
        description: Joi.string()
    })
}
const inviteValidate = {
    body: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    })
}


module.exports = {
    createValidate,
    updateValidate,
    inviteValidate
}