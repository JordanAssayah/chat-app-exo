import { v4 as uuidv4 } from 'uuid'
import CassandraClient from '../db/connection.js'

export default (io, socket) => {
  const createMessage = async ({ text, sender_id, channel_id }) => {
    const message_id = uuidv4()
    const now = new Date()
    const query = `
      INSERT INTO messages (message_id, text, sender_id, channel_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    await CassandraClient.execute(query, [message_id, text, sender_id, channel_id, now, now], { prepare: true })

    io.in(channel_id).emit('message', {
      text,
      sender_id,
      channel_id,
      message_id,
      created_at: now
    })
  }

  const getAllMessagesByChannelId = async ({ channel_id }) => {
    const query = 'SELECT * FROM messages WHERE channel_id = ?'
    const results = await CassandraClient.execute(query, [channelId], { prepare: true })

    io.to(socket.id).emit('message:getAllByChannelId', results.rows)
  }

  const deleteMessageById = async ({ id, channel_id }) => {
    const query = `DELETE FROM messages WHERE message_id = ?`
    await CassandraClient.execute(query, [id], { prepare: true })

    io.to(channel_id).emit('message:deleted', id)
  }

  socket.on('message:create', createMessage)
  socket.on('message:getAllByChannelId', getAllMessagesByChannelId)
  socket.on('message:deleteById', deleteMessageById)
}