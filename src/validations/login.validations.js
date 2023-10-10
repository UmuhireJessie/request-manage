import joi from 'joi'

export default function loginValidation (data) {
  const schema = joi.object({
    email: joi.string().required().label('Email'),
    password: joi.string().required().label('Password')
  })

  return schema.validate(data, {
    abortEarly: false
  })
}
