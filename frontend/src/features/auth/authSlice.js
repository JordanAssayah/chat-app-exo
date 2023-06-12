import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: undefined,
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload
    },
  },
})

export const {
  setFullName,
} = authSlice.actions

export default authSlice.reducer