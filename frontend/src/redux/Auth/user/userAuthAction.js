import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:4000'

export const registerUser = createAsyncThunk(
  'regiserUser',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/v1/user/new`,
        userData,
        config
      )
      return data.user;
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

export const loginUser = createAsyncThunk(
  'loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const { data } = await axios.post(
        `${backendURL}/api/v1/user/login`,
        userData,
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

export const getUser = createAsyncThunk(
  'getUser',
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${backendURL}/api/v1/user/profile`,
      )
      return data.user;
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


// export const getUser = createAsyncThunk(
//   'getUser',
//   async ({ rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           withCredentials: true,
//           'Content-Type': 'application/json',
//         },
//       }
//       const { data } = await axios.get(
//         `${backendURL}/api/v1/user/profile`,
//         {
//           withCredentials: true
//         }
//       )
//       return data.user;
//     } catch (error) {
//     // return custom error message from backend if present
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message)
//       } else {
//         return rejectWithValue(error.message)
//       }
//     }
//   }
// )