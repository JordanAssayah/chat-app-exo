import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import messagesReducer from './features/channels/messages/messagesSlice'
import channelsReducer from './features/channels/channelsSlice'
import usersReducer from './features/users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    users: usersReducer,
    messages: messagesReducer,
    channels: channelsReducer,
  },
})