import { createSlice } from '@reduxjs/toolkit'
import {registerDoctor,loginDoctor} from './doctorAuthAction'

const doctorToken = localStorage.getItem('doctorToken')
  ? localStorage.getItem('doctorToken')
  : null

const initialState = {
  loading: false,
  doctorInfo: {}, // for user object
  doctorToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const doctorAuth = createSlice({
  name: 'doctorAuth',
  initialState,
  reducers: {
    doctorLogout: (state) => {
      localStorage.removeItem('doctorToken') // deletes token from storage
      state.loading = false
      state.doctorInfo = null
      state.doctorToken = null
      state.error = null
    },
  },
  extraReducers: {
    [registerDoctor.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [registerDoctor.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.doctorToken = payload.token
      state.doctorInfo = payload.doctor
    },
    [registerDoctor.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    [loginDoctor.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [loginDoctor.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
      state.doctorToken = payload.token
      state.doctorInfo = payload.doctor
    },
    [loginDoctor.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})
export const { doctorLogout } = doctorAuth.actions
export default doctorAuth.reducer