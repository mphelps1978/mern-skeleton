import config from '../config/config'
import app from './express'
import mongoose from 'mongoose'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to the database at ${mongoUri}`)
})

app.listen(config.port, (err) => {
  if(err) {
    console.log(err);
  }
  console.log('Server started on port %s', config.port)
})