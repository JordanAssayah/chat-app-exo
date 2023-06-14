import { io } from 'socket.io-client'

const URL = 'http://localhost:3000'

const socket = io(URL, {
  autoConnect: false
})

const sendMessage = (content, userId = 'test', channelId = 'general') => {
  socket.emit('createMessage', {
    channel_id: channelId,
    user_id: userId,
    content
  })
}

const deleteMessage = (id, destination = 'general') => {
  socket.emit('removeMessage', { id, to: destination })
}

const createChannel = (channel) => {
  socket.emit('channel:create', channel)
}

const joinChannel = (name) => {
  socket.emit('channel:join', name)
}

const leaveChannel = (name) => {
  socket.emit('channel:leave', name)
}

export default {
  socket,
  sendMessage,
  deleteMessage,
  createChannel,
  joinChannel,
  leaveChannel,
}
