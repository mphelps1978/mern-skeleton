import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import template from '../template'

import userRoutes from '../server/routes/user.routes'
import authRoutes from '../server/routes/auth.routes'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)

// error handling
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: err.name + ':' + err.message})
  } else if (err) {
    res.status(400).json({error: err.name + ':' + err.message})
    console.log(err)
  }
})

app.get('/', (req, res) => {
  res.status(200).send(template())
})

export default app