import { validate } from 'uuid'

const validateAssigneeId = (req, res, next) => {
  if (req.body.requestCategory === 'administrative'){
    return next()
  }
  const { assigneeId } = req.body

  if (!validate(assigneeId)) {
    return res.status(400).json({ status: 'fail', message: 'Invalid assignee id' })
  }
  next()
}

export default validateAssigneeId
