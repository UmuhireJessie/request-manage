import express from 'express'
import users from './userRoute'

const routes = express()

routes.use('/api/v1/users', users)

export default routes
