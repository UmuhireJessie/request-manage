import express from 'express'
import Users from '../controller/userController'
import signupValidate from '../middleware/signUpValidate'
import { checkUserExist } from '../middleware/checkUser'
import loginValidate from '../middleware/loginValidate'
import changePasswordValidate from '../middleware/changePassword'
import isAuthenticated from '../helpers/verifyToken'
import checkRole from '../middleware/checkRole'
import validateUUIDMiddleware from '../middleware/validateUUID'
import profileValidate from '../middleware/profileValidate'

const router = express.Router()
router.post('/register-student', signupValidate, checkUserExist, Users.registerStudent)
router.post('/register-faculty', signupValidate, checkUserExist, Users.registerFaculty)
router.post('/login', loginValidate, Users.login)
router.post('/verify-faculty/:id', validateUUIDMiddleware, checkRole('admin'), Users.verifyFacultyAccount)
router.patch(
    '/change-password',
    isAuthenticated,
    changePasswordValidate,
    Users.changePassword
)
router.get('/profile', isAuthenticated, Users.getProfile)
router.patch('/profiles', isAuthenticated, profileValidate, Users.updateProfile)
router.get('/all-faculty', isAuthenticated, Users.getAllFaculty)
router.get('/all-student', isAuthenticated, checkRole('admin'), Users.getAllStudents)

export default router
