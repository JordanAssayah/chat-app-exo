import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
  },
})

export const {
  setMessage,
} = channelsSlice.actions

export default channelsSlice.reducer