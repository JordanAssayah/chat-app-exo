import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
  generalId: undefined
}

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload
    },
    setGeneralChannel: (state, action) => {
      const { channel_id } = action.payload
      state.entities[channel_id] = action.payload
      state.ids.push(channel_id)
      state.generalId = channel_id
    },
  },
})

export const {
  setMessage,
  setGeneralChannel,
} = channelsSlice.actions

export default channelsSlice.reducer