import joi from 'joi'
import { joiPasswordExtendCore } from 'joi-password'

const joiPassword = joi.extend(joiPasswordExtendCore)

async function SignUpValidation (data) {
  const schema = joi.object({
    firstName: joi.string().min(3).required().label('firstName'),
    lastName: joi.string().min(3).required().label('lastName'),
    email: joi.string().email().label('email'),
    role: joi.string().label('role'),
    password: joiPassword
      .string()
      .min(8)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .required()
      .label('password')
      .messages({
        'string.length': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
      })
  })

  return await schema.validate(data, {
    abortEarly: false
  })
}

export default SignUpValidation
