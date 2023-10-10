export default function checkAdmin () {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role

      if (userRole === 'admin') {
        return res
          .status(403)
          .json({ status: 'fail', message: 'Sorry, admin can not make a request' })
      }
      next()
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: err.message
      })
    }
  }
}
