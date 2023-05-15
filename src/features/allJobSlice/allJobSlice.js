import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';


const initialState = {
  isEditing: false,
  isLoading: true,
  isDeleting: false,
  company: '',
  jobType: 'all',
  status: 'all',
  sort: 'latest',
  search: '',
  allJobs: [],
  allJobsError: '',
  jobId: null
};
export const getAllJobs = createAsyncThunk(
  'allJobs/getJobs',
  async (_, thunkAPI) => {
    let url = `/jobs`;
    
    try {
      const resp = await customFetch.get(url, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.user.token}`,
        },
      });
      return resp.data.jobs;
    } catch (error) {
     if(error.response){
      return   thunkAPI.rejectWithValue(error.response.data.msg)
     }
     return thunkAPI.rejectWithValue(error.message)
      
    }
  }
);
export const deleteJob = createAsyncThunk(
  'delete/job', 
  async (jobId, thunkAPI) => {
  
    try {
      const resp = await customFetch.delete(`/jobs/${jobId}`,{
        headers: {
          authorization: `Bearer ${thunkAPI.getState().userSlice.user.token}`
        }
      });

       thunkAPI.dispatch(getAllJobs())
      thunkAPI.dispatch(modifyAllJobSlice({name: 'isLoading', value: false}))

      return resp.data.msg
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    
    }

  }
)






const addJobPageSlice = createSlice({
  name: 'addJobPageSlice',
  initialState,

  reducers: {
    modifyAllJobSlice: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
  
    clearJobInputs: (state) => {
     return initialState
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      if(payload){
      state.allJobs = payload;
      }

    },
    [getAllJobs.rejected]: (state, { payload }) => {
      console.log(payload)
      state.allJobsError = payload
      state.isLoading = false;
     
    },
    [deleteJob.pending]: (state,{payload}) => {
      
      state.isDeleting = true;
    },
    [deleteJob.fulfilled]: (state,{payload}) => {
      toast.success(payload)
      state.isDeleting = false;
    },
    [deleteJob.rejected]: (state, { payload }) => {
     
      state.isDeleting = false;
      
     toast.error(payload)
    },

  },
});

export default addJobPageSlice.reducer;
export const { modifyAllJobSlice, clearJobInputs } = addJobPageSlice.actions;
