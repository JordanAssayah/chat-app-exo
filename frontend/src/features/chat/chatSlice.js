import { createSlice } from '@reduxjs/toolkit'

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