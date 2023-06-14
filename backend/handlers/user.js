import { v4 as uuidv4 } from 'uuid'
import CassandraClient from '../db/connection.js'

export default (io, socket) => {
  const createUser = async (user) => {
    console.log(user)
    const user_id = uuidv4()
    
    const query = 'SELECT * FROM channels WHERE name = ?'
    const channels = await CassandraClient.execute(query, ['general'], { prepare: true })
    const general = channels.first()

    const queries = [
      {
        query: `
          INSERT INTO users (user_id, username, email, password, created_at, updated_at)
          VALUES (?, ?, ?, ?, now(), now())
        `,
        params: [ user_id, user.username, user.email, user.password ]
      }, {
        query: `
          INSERT INTO channels_users (user_id, channel_id, created_at, updated_at)
          VALUES (?, ?, now(), now())
        `,
        params: [ user_id, general.channel_id ]
      }
    ];
    await CassandraClient.batch(queries, { prepare: true })

    socket.emit('user:created', { user_id, username, email })
  }

  socket.on('user:create', createUser)
}