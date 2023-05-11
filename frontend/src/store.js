import { configureStore } from '@reduxjs/toolkit'

import getAllDoctors from "./redux/without login/getAllDoctors"
import doctorDetailsReducer from "./redux/without login/doctorDetails"

import userAuthReducer from "./redux/Auth/user/userAuth"

import doctorAuthReducer from "./redux/Auth/doctor/doctorAuth"
import appointmentReducer from './redux/appointment/appointment'
export default configureStore({
  reducer: {

    getAllDoctors : getAllDoctors,
    doctorDetails : doctorDetailsReducer,

    doctorAuth: doctorAuthReducer,

    userAuth: userAuthReducer,

    appointment: appointmentReducer,
  },
})