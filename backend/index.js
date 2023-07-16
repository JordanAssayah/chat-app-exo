import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import * as queries from './db/queries.js'

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

io.on('connection', async (socket) => {
  const general = await queries.getGeneralChannel()
  const users = await queries.getAllUsers()

  socket.join(general.channel_id.toString())

  io.to(socket.id).emit('user:get-all', users)
  io.to(socket.id).emit('channel:general', general)

  registerMessageHandlers(io, socket)
  registerChannelHandlers(io, socket)
  registerUserHandlers(io, socket)
})

httpServer.listen(3000)
