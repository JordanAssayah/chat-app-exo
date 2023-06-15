import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    username: undefined
  },
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setUserName: (state, action) => {
      state.user.username = action.payload
    },
  },
})

export const {
  setUser,
  setUserName,
} = authSlice.actions

export default authSlice.reducer