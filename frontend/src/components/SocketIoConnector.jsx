import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import * as authActions from '../features/auth/authSlice'
import * as usersActions from '../features/users/usersSlice'
import * as channelsActions from '../features/channels/channelsSlice'
import * as messagesActions from '../features/channels/messages/messagesSlice'
import { SocketIoContext } from '../utils/contexts'

import { socket } from '../services/socket'

const SocketIoConnector = ({ children }) => {
  const connectedUser = useSelector(state => state.auth.user)
  const generalId = useSelector(state => state.channels.generalId)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { channelId } = useParams()

  useEffect(() => {
    socket.connect()
    
    function onConnect() {
      console.log('Client connected!')
    }

    function onDisconnect() {
      console.log('Client disconnected!')
    }

    function onUserCreated(user) {
      dispatch(authActions.setUser(user))
      dispatch(usersActions.addUserAfterCreation(user))
      navigate(`/channels/${generalId}`)
    }

    function onGetAllUsers(users) {
      dispatch(usersActions.setUsers(users))
    }

    function onUserAuthenticated(user) {
      dispatch(authActions.setUser(user))
      navigate(`/channels/${generalId}`)
    }

    function onUserCreationError(error) {
      console.error(error)
    }

    function onUserAuthenticationError(error) {
      console.error(error)
    }

    function onMessage(message) {
      dispatch(messagesActions.addMessage(message))
    }

    function onGetAllMessages(messages) {
      dispatch(messagesActions.setMessages(messages))
    }

    function onMessageDeleted(id) {
      dispatch(messagesActions.deleteMessageById(id))
    }

    function onChannelGeneral(channel) {
      dispatch(channelsActions.setGeneralChannel(channel))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    socket.on('user:created', onUserCreated)
    socket.on('user:get-all', onGetAllUsers)
    socket.on('user:creation-error', onUserCreationError)
    socket.on('user:authenticated', onUserAuthenticated)
    socket.on('user:authentication-error', onUserAuthenticationError)

    socket.on('message', onMessage)
    socket.on('message:get-all', onGetAllMessages)
    socket.on('message:deleted', onMessageDeleted)

    socket.on('channel:general', onChannelGeneral)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)

      socket.off('user:created', onUserCreated)
      socket.off('user:get-all', onGetAllUsers)
      socket.off('user:creation-error', onUserCreationError)
      socket.off('user:authenticated', onUserAuthenticated)
      socket.off('user:authentication-error', onUserAuthenticationError)

      socket.off('message', onMessage)
      socket.off('message:get-all', onGetAllMessages)
      socket.off('message:deleted', onMessageDeleted)

      socket.off('channel:general', onChannelGeneral)
    }
  }, [dispatch, navigate, generalId])

  const createUser = (user) => {
    socket.emit('user:create', user)
  }

  const authenticate = (credentials) => {
    socket.emit('user:authenticate', credentials)
  }

  const sendMessage = (message) => {
    socket.emit('createMessage', {
      content: message,
      user_id: connectedUser._id,
      channel_id: generalId,
    })
  }

  const deleteMessage = (id) => {
    socket.emit('removeMessage', { id, channel_id: generalId })
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
        authenticate,
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
}

export default SocketIoConnector