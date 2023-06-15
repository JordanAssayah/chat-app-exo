import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message_id } = action.payload
      state.entities[message_id] = action.payload
      state.ids.push(message_id)
    },
    setMessages: (state, action) => {
      for (const message of action.payload) {
        const { message_id } = message
        state.entities[message_id] = message
        state.ids.push(message_id)
      }
    },
    deleteMessageById: (state, action) => {
      const id = action.payload
      delete state.entities[id]
      state.ids = state.ids.filter(messageId => messageId !== id)
    },
  },
})

export const {
  addMessage,
  setMessages,
  deleteMessageById,
} = messagesSlice.actions

export default messagesSlice.reducer