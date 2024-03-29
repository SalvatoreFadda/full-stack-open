const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

mongoose.connect(config.MONGODB_URI)

const app = express() 

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger) 
app.use(middleware.tokenExtractor) 

app.use('/api/blogs', middleware.userExtractor, blogsRouter) 
app.use('/api/users', usersRouter) 
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint) 
app.use(middleware.errorHandler) 

module.exports = app
