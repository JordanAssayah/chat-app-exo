import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import chatReducer from './features/chat/chatSlice'
import messagesReducer from './features/channels/messages/messagesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messagesReducer,
  },
})