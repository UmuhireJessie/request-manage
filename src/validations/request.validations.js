import joi from 'joi'

async function requestValidation (data) {
  const schema = joi.object({
    title: joi.string().min(3).required().label('title'),
    detail: joi.string().min(3).required().label('detail'),
    requestCategory: joi
    .string()
    .lowercase()
    .valid(
      'administrative',
      'academic'
    )
    .label('requestCategory'),
    assigneeId: joi.string().min(3).label('assigneeId'),
  })

  return await schema.validate(data, {
    abortEarly: false
  })
}

export default requestValidation
