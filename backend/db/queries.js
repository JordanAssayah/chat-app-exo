import CassandraClient from './connection.js'

export const getGeneralChannel = async () => {
  const query = 'SELECT * FROM channels WHERE name = ?'
  const channels = await CassandraClient.execute(query, ['general'], { prepare: true })
  return channels.first()
}

export const getUserByUsername = async (username) => {
  const searchedUser = await CassandraClient.execute(
    'SELECT * FROM users WHERE username = ?',
    [username],
    { prepare: true }
  )

  return searchedUser.first()
}

export const getAllUsers = async () => {
  const query = 'SELECT * FROM users'
  const users = await CassandraClient.execute(query)
  return users.rows
}

export const getAllMessages = async () => {
  const query = 'SELECT * FROM messages'
  const messages = await CassandraClient.execute(query)
  return messages.rows
}