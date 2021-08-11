const express = require('express')


const router = require('./auth')

const apiRouter = express.Router()

apiRouter.use('/auth', router.authRouter)

module.exports = apiRouter   
