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
      const { _id } = action.payload
      state.entities[_id] = action.payload
      state.ids.push(_id)
    },
    setMessages: (state, action) => {
      for (const message of action.payload) {
        const { _id } = message
        state.entities[_id] = message
        state.ids.push(_id)
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