import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading:false,
    doctors:[],
    error:'',
}

export const fetchDoctors = createAsyncThunk('getAllDoctors',()=>{
    return axios
        .get('http://localhost:4000/api/v1/doctors',{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.data)
})

const getAllDoctors = createSlice({
    name:'doctor',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchDoctors.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchDoctors.fulfilled, (state, action) => {
            state.loading = false
            state.doctors = action.payload.doctors
            state.error = ''
        })
        builder.addCase(fetchDoctors.rejected,(state, action)=>{
            state.loading = false
            state.doctors = []
            state.error = action.error.message
        })
    },
})


export default getAllDoctors.reducer