import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import * as authActions from '../features/auth/authSlice'
import * as messagesActions from '../features/channels/messages/messagesSlice'
import { SocketIoContext } from '../utils/contexts'

import socketIo from '../services/socket'

const SocketIoConnector = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { socket } = socketIo

  useEffect(() => {
    socket.connect()
    
    function onConnect() {
      console.log('Client connected!')
    }

    function onDisconnect() {
      console.log('Client disconnected!')
    }

    function onMessage(message) {
      dispatch(messagesActions.addMessage(message))
    }

    function onMessageDeleted(id) {
      dispatch(messagesActions.deleteMessageById(id))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('messageCreated', onMessage)
    socket.on('messageDeleted', onMessageDeleted)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('messageCreated', onMessage)
      socket.off('messageDeleted', onMessageDeleted)
    }
  }, [socket, dispatch, navigate])

  return (
    <SocketIoContext.Provider
      value={socketIo}>
      {children ? children : <Outlet />}
    </SocketIoContext.Provider>
  )
}

SocketIoConnector.propTypes = {
  children: PropTypes.object,
}

export default SocketIoConnector