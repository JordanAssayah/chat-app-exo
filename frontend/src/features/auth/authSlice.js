import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: undefined,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload
    },
  },
})

export const {
  setUserName,
} = authSlice.actions

export default authSlice.reducer