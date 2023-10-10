import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = joi.extend(joiPasswordExtendCore)

async function ChangePasswordValidation (data) {
  const schema = joi.object({
    oldPassword: joi.string().required().label('oldPassword'),
    newPassword: joiPassword
      .string()
      .min(8)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
      .label('newPassword')
      .messages({
        'string.length': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
      })
  })

  return await schema.validate(data, {
    abortEarly: false
  })
}

export default ChangePasswordValidation
