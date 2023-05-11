import { createSlice } from '@reduxjs/toolkit'
import {createAppointment} from './appointmnetAction'

const initialState = {
  loading: false,
  appointment: {}, // for appointment object
  error: null,
  success: false, // for monitoring the registration process.
}

const appointment = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: {
    [createAppointment.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [createAppointment.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.appointment = payload.appointment
      state.success = true // registration successful
    },
    [createAppointment.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})
export default appointment.reducer