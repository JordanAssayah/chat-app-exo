import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet, useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'

import * as authActions from '../features/auth/authSlice'
import * as messagesActions from '../features/channels/messages/messagesSlice'
import { SocketIoContext } from '../utils/contexts'

const SocketIoConnector = ({ children, username }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [socket] = useState(io.connect('http://localhost:3000'))

  useEffect(() => {
    function onConnect() {
      console.log('Client connected!')
    }

    function onDisconnect() {
      console.log('Client disconnected!')
    }

    function onUserCreated(user) {
      dispatch(authActions.setUser(user))
      socket.disconnect()
      navigate('/dashboard')
    }

    function onMessage(message) {
      dispatch(messagesActions.addMessage(message))
    }

    function onMessageDeleted(id) {
      dispatch(messagesActions.deleteMessageById(id))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.on('user:created', onUserCreated)

    socket.on('message', onMessage)
    socket.on('message:deleted', onMessageDeleted)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)

      socket.off('user:created', onUserCreated)

      socket.off('message', onMessage)
      socket.off('message:deleted', onMessageDeleted)
    }
  }, [socket, dispatch])

  const createUser = (user) => {
    socket.emit('user:create', user)
  }

  const sendMessage = (message, destination = 'general') => {
    socket.emit('message:create', {
      content: message,
      from: username,
      to: destination,
    })
  }

  const deleteMessage = (id, destination = 'general') => {
    socket.emit('message:deleteById', { id, to: destination })
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

  return (
    <SocketIoContext.Provider
      value={{
        socket,
        createUser,
        createChannel,
        joinChannel,
        leaveChannel,
        sendMessage,
        deleteMessage
      }}>
      {children ? children : <Outlet />}
    </SocketIoContext.Provider>
  )
}

SocketIoConnector.propTypes = {
  children: PropTypes.object,
  username: PropTypes.string,
}

export default SocketIoConnector