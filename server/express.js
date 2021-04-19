// Server Specific Imports
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'

//Client Specific Imports
import React from 'react'
import ReactDomServer from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { ServerStyleSheets, ThemeProvider} from '@material-ui/styles'

//File Imports
import userRoutes from '../server/routes/user.routes'
import authRoutes from '../server/routes/auth.routes'
import MainRouter from '../client/MainRouter'
import theme from '../client/theme'

import Template from '../template'
import devBundle from './devBundle' // remove for production

const CURRENT_WORKING_DIRECTORY = process.cwd()

const app = express()
devBundle.compile(app) // remove for production
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist'))) // To find static resrouces

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

const sheets = new ServerStyleSheets()
const context = {}
const markup = ReactDomServer.renderToString(
  sheets.collect(
    <StaticRouter location={ req.url } context={context}>
      <ThemeProvider theme = {theme}>
        <MainRouter/>
      </ThemeProvider>
    </StaticRouter>
  )
)
if (context.url) {
  return res.redirect(303, context.url)
}
const css = sheets.toString()
res.status(200).send(Template({
  markup: markup,
  css: css
}))
})

export default app