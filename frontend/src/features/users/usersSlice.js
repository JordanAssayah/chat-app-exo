import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
  entities: {},
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      for (const user of action.payload) {
        const { _id } = user
        state.entities[_id] = user
        state.ids.push(_id)
      }
    },
    addUserAfterCreation: (state, action) => {
      const { _id } = action.payload
      state.entities[_id] = action.payload
      state.ids.push(_id)
    },
  },
})

export const {
  setUsers,
  addUserAfterCreation,
} = usersSlice.actions

export default usersSlice.reducer