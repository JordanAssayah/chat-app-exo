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
      const { _id } = action.payload
      state.entities[_id] = action.payload
      state.ids.push(_id)
      state.generalId = _id
    },
  },
})

export const {
  setMessage,
  setGeneralChannel,
} = channelsSlice.actions

export default channelsSlice.reducer