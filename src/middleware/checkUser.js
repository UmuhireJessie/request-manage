import { User } from '../database/models'

export const checkUserExist = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({
      where: { email }
    })
    if (user)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Email already exists' })
    next()
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error: error.message
    })
  }
}
