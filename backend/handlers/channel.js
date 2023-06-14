import { v4 as uuidv4 } from 'uuid'
import CassandraClient from '../db/connection.js'

export default (io, socket) => {
  const createChannel = async (name) => {
    const id = uuidv4()
    const query = 'INSERT INTO channels (channel_id, name) VALUES (?, ?)'
    await CassandraClient.execute(query, [id, name], { prepare: true })

    socket.join(name)
    io.emit('channel:created', { id, name })
  }

  const joinChannel = async (name) => {
    const generatedId = uuidv4()
    const query = 'INSERT INTO channels (channel_id, name) VALUES (?, ?)'
    await CassandraClient.execute(query, [generatedId, name], { prepare: true })

    socket.join(name)
    io.emit('channel:created', )
  }

  const leaveChannel = async (name) => {
    const generatedId = uuidv4()
    const query = 'INSERT INTO channels (channel_id, name) VALUES (?, ?)'
    await CassandraClient.execute(query, [generatedId, name], { prepare: true })

    socket.leave(name)
    io.emit('channel:left', )
  }

  const getAllChannelsByUser = async (userId) => {
    const query = 'SELECT * FROM channels_users WHERE user_id = ?'
    const results = await CassandraClient.execute(query, [userId], { prepare: true })

    results.rows.map(channel => {
      socket.join(channel.name)
    })
  }

  socket.on('channel:create', createChannel)
  socket.on('channel:join', joinChannel)
  socket.on('channel:leave', leaveChannel)
  socket.on('channel:getAllByUser', getAllChannelsByUser)
}
