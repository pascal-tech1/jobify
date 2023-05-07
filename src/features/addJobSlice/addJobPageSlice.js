
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
    [addjob.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [addjob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.job = payload;
      
      console.log(state.job);
    },
    [addjob.rejected]: (state, { payload }) => {
      state.isLoading = false;
    },
  },
});

export default addJobPageSlice.reducer;
export const { modifyAddJobSlice, clearJobInputs } = addJobPageSlice.actions;
