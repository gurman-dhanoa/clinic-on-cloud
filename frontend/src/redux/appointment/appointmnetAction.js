import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
const backendURL = 'http://localhost:4000'

export const createAppointment = createAsyncThunk(
    'createAppointment',
    async (formData, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }

        const { data } = await axios.post(
          // `${backendURL}/api/v1/user/appointment/new/${doctorId}`,
          `${backendURL}/api/v1/user/appointment/new/645a4c1db2699f1d281a9fe7`,
          formData,
          config
        )
        return data;
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )