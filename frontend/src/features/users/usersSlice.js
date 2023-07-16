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
        const { user_id } = user
        state.entities[user_id] = user
        state.ids.push(user_id)
      }
    },
    addUserAfterCreation: (state, action) => {
      const { user_id } = action.payload
      state.entities[user_id] = action.payload
      state.ids.push(user_id)
    },
  },
})

export const {
  setUsers,
  addUserAfterCreation,
} = usersSlice.actions

export default usersSlice.reducer