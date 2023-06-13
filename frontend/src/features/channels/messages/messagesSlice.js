import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const {
  setMessage,
} = messagesSlice.actions

export default messagesSlice.reducer