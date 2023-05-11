import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:4000'

export const registerDoctor = createAsyncThunk(
  'regiserDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/v1/doctor/new`,
        doctorData,
        config
      )
      localStorage.setItem('doctorToken', data.token)
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

export const loginDoctor = createAsyncThunk(
  'loginDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/v1/doctor/login`,
        doctorData,
        config
      )
      localStorage.setItem('doctorToken', data.token)
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