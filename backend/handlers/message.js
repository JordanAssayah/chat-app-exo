import { v4 as uuidv4 } from 'uuid'
import CassandraClient from '../db/connection.js'

export default (io, socket) => {
  const createMessage = async ({ content, from, to }) => {
    const messageId = uuidv4()
    const now = new Date()
    const query = `
      INSERT INTO messages (message_id, text, sender_id, channel_id, created_at, updated_at)
      VALUES (?, ?, now(), now(), ?, ?)
    `
    await CassandraClient.execute(query, [messageId, content, now, now], { prepare: true })

    io.to(to).emit('message', { content, from, to, messageId, datetime: now })
  }

  const getAllMessagesByChannelId = async ({ channelId }) => {
    const query = 'SELECT * FROM messages WHERE channel_id = ?'
    const results = await CassandraClient.execute(query, [channelId], { prepare: true })

    io.to(socket.id).emit('message:getAllByChannelId', results.rows)
  }

  const deleteMessageById = async ({ id, to }) => {
    const query = `DELETE FROM messages WHERE message_id = ?`
    await CassandraClient.execute(query, [id], { prepare: true })

    io.to(to).emit('message:deleted', id)
  }

  socket.on('message:create', createMessage)
  socket.on('message:getAllByChannelId', getAllMessagesByChannelId)
  socket.on('message:deleteById', deleteMessageById)
}