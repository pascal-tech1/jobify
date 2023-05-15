
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import customFetch from '../../utils/axios';
const initialState = {
  isLoading: false,
  job: null,
  position: '',
  company: '',
  jobType: 'full-time',
  status: 'pending',
  jobLocation: ''
};
export const addjob = createAsyncThunk('add/job', async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post('/jobs', job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().userSlice.user.token}`,
      },
    });
    return resp.data.job;
  } catch (error) {
    console.log(error);
  }
});

export const editjob = createAsyncThunk(
  'edit/job', async({jobId,job}, thunkAPI )=>{
    console.log('im here')
    try {
      const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
        headers:{
          authorization: `Bearer ${thunkAPI.getState().userSlice.user.token}`
        }
     
      })
  return resp.data
    } catch (error) {
      {
        return   thunkAPI.rejectWithValue(error.response.data.msg)
       }
       return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const addJobPageSlice = createSlice({
  name: 'addJobPageSlice',
  initialState,

  reducers: {
    modifyAddJobSlice: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearJobInputs: (state) => {
     return initialState
    },
  },
  extraReducers: {
      [editjob.pending]: (state,{payload})=>{
      state.isEditing = true
      state.isLoading = true
     
    },
    [editjob.fulfilled]: (state, {payload})=>{
      state.isEditing = false
    state.isLoading = false
    toast.success('job modify successfully')
      
    },
    [editjob.rejected]: (state,{payload})=>{
      state.isEditing = false
      state.isLoading = false
      toast.error(payload)
     
    },
    [addjob.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [addjob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.job = payload;
    },
    [addjob.rejected]: (state, { payload }) => {
      
      state.isLoading = false;
    },
  
  },
});

export default addJobPageSlice.reducer;
export const { modifyAddJobSlice, clearJobInputs } = addJobPageSlice.actions;
