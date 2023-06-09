import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage, addUserToLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const registerUser = createAsyncThunk('user/registerUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/register', user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});
export const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.post('/auth/login', user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

//
const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = payload;
    },
  
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(state.user);
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      addUserToLocalStorage(state.user);
      toast.success(state.user.email);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
