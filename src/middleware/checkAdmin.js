export default function checkAdmin () {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role

      if (userRole === 'admin' || userRole === 'facilitator') {
        return res
          .status(403)
          .json({ status: 'fail', message: 'Sorry, you are not allowed to make a request' })
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
