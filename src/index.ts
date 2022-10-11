import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import morgan from 'morgan'
import path from 'path'
import errorHandler from './middleware/errorHandler.middleware'
import routes from './routes'

dotenv.config()

const PORT = process.env.PORT || 3000

// create an instance server
const app: Application = express()

app.use('/csvFiles', express.static(path.join(__dirname, 'csvFiles')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// create main routes default to use '/api'
app.use('/api', routes)

// HTTP request logger middleware
app.use(morgan('short'))

// Global error handling
app.use(errorHandler)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})
export default app
