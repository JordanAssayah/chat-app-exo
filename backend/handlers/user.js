import { v4 as uuidv4 } from 'uuid'
import CassandraClient from '../db/connection.js'
import * as queries from '../db/queries.js'

export default (io, socket) => {
  const createUser = async (user) => {
    const user_id = uuidv4()

    const searchedUser = await queries.getUserByUsername(user.username)

    if (searchedUser !== null) {
      io.to(socket.id).emit('user:creation-error', 'Username already in use')
    }
    
    const general = await queries.getGeneralChannel()

    const queries = [
      {
        query: `
          INSERT INTO users (user_id, username, email, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, toTimestamp(now()), toTimestamp(now()))
        `,
        params: [ user_id, user.username, user.email, user.password ]
      }, {
        query: `
          INSERT INTO channels_users (user_id, channel_id, created_at, updated_at)
          VALUES (?, ?, toTimestamp(now()), toTimestamp(now()))
        `,
        params: [ user_id, general.channel_id ]
      }
    ];
    await CassandraClient.batch(queries, { prepare: true })

    socket.emit('user:created', { user_id, username: user.username, email: user.email })
  }

  const authenticateUser = async ({ username, password }) => {
    const user = await queries.getUserByUsername(username)

    if ((user === null) || user.password !== password) {
      io.to(socket.id).emit('user:authentication-error', 'Bad credentials or user does not exist!')
    }

    const messages = await queries.getAllMessages()
    
    socket.join('general')
    io.to(socket.id).emit('message:get-all', messages)
    io.to(socket.id).emit('user:authenticated', user)
  }

  socket.on('user:create', createUser)
  socket.on('user:authenticate', authenticateUser)
}