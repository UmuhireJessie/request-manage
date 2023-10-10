import express from 'express'
import users from './userRoute'
import requests from './requestRoute'

const routes = express()

routes.use('/api/v1/users', users)
routes.use('/api/v1/users', requests)

export default routes
