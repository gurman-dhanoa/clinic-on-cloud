import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading:false,
    doctor:[],
    error:'',
}

export const fetchDoctorDetails = createAsyncThunk('doctorDetails',(id)=>{
    return axios
        .get(`http://localhost:4000/api/v1/user/doctor/${id}`,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.data)
})

const doctorDetails = createSlice({
    name:'doctorDetails',
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchDoctorDetails.pending,(state)=>{
            state.loading = true
        })
        builder.addCase(fetchDoctorDetails.fulfilled, (state, action) => {
            state.loading = false
            state.doctor = action.payload.doctor
            state.error = ''
        })
        builder.addCase(fetchDoctorDetails.rejected,(state, action)=>{
            state.loading = false
            state.doctor = []
            state.error = action.error.message
        })
    },
})


export default doctorDetails.reducer