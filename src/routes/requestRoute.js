import express from 'express'
import Requests from '../controller/requestController'
import requestValidate from '../middleware/requestValidate'
import isAuthenticated from '../helpers/verifyToken'
import checkRole from '../middleware/checkRole'
import checkAdmin from '../middleware/checkAdmin'
import validateAssigneeId from '../middleware/validateId'

const router = express.Router()
router.post('/request', isAuthenticated, checkAdmin(), validateAssigneeId ,requestValidate, Requests.createRequest)
router.get('/request/all', isAuthenticated, checkRole('admin'), Requests.getAllRequests)
router.get('/request/single', isAuthenticated, Requests.getAllRequestUser)
router.post('/request/:requestId/feedback', isAuthenticated, Requests.addResponse)
router.get('/request/:requestId/feedback', isAuthenticated, Requests.getAllFeedbackRequests)

export default router
