import { validate } from 'uuid'

const validateAssigneeId = (req, res, next) => {
  const { assigneeId } = req.body

  if (!validate(assigneeId)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid assignee id' })
  }
  next()
}

export default validateAssigneeId
