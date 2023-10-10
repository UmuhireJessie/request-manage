import requestValidation from '../validations/request.validations'

export default async function requestValidate (req, res, next) {
  const { body } = req
  const { error } = await requestValidation(body)

  if (error) {
    const errorMessage = error.details.map(err => err.message).join(' ')
    return res.status(400).json({ status: 'fail', message: errorMessage })
  }
  next()
}
