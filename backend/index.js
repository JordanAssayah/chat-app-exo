import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import registerMessageHandlers from './handlers/message.js'
import registerChannelHandlers from './handlers/channel.js'
import registerUserHandlers from './handlers/user.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  socket.join('general')
  registerMessageHandlers(io, socket)
  registerChannelHandlers(io, socket)
  registerUserHandlers(io, socket)
})

httpServer.listen(3000)
