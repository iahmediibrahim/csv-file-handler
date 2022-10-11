import express from 'express'
import csvRouter from './api/csv'

const routes = express.Router()

routes.use('/csv', csvRouter)

export default routes
