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
      const { messageId } = action.payload
      state.entities[messageId] = action.payload
      state.ids.push(messageId)
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
  deleteMessageById,
} = messagesSlice.actions

export default messagesSlice.reducer