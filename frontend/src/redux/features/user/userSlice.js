import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fullName: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload
    },
  },
})

export const {
  setFullName,
} = userSlice.actions

export default userSlice.reducer