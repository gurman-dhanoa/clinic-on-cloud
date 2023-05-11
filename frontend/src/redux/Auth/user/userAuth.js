import { createSlice } from '@reduxjs/toolkit'
import {registerUser,loginUser,getUser} from './userAuthAction'


const initialState = {
  loading: false,
  userInfo: {}, // for user object
  error: null,
  success: false, // for monitoring the registration process.
}

const userAuth = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.loading = false
      state.userInfo = null
      state.error = null
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.user
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [loginUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.user
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [getUser.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.userInfo = payload.user
    },
    [getUser.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})
export const { userLogout } = userAuth.actions
export default userAuth.reducer