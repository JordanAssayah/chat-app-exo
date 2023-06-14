import { createSlice } from '@reduxjs/toolkit'
import * as messagesActions from '../channels/messages/messagesSlice'

const initialState = {
  message: '',
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const {
  setMessage,
} = chatSlice.actions

export default chatSlice.reducer