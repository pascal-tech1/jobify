import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';
import { updateUser } from '../userSlice/userSlice';
import { toast } from 'react-toastify';
import { addUserToLocalStorage, } from '../../utils/localStorage';


export const updateProfile = createAsyncThunk('user/updateProfile', async (user, thunkAPI) => {
  try {
    const resp = await customFetch.patch('/auth/updateUser', user, {
      headers: { authorization: `Bearer ${thunkAPI.getState().userSlice.user.token}` },
    });
    const fetchUserProfile = resp.data.user;
    
    thunkAPI.dispatch(updateUser(fetchUserProfile));
    const userProfile = thunkAPI.getState().userSlice.user;
return userProfile
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const profilePageSlice = createSlice({
  name: 'profilePageSlice',
  initialState: {
    isLoading: false,
    location:'',
     name :'', 
     email:'',
     lastName:'',
  
  },
  reducers: {
    toggleIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    changeProfileState: (state, { payload :{name,value}}) => {
      state[name] = value;
      
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
       
        addUserToLocalStorage(payload);
        
      })
      .addCase(updateProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default profilePageSlice.reducer;
export const { toggleIsLoading,changeProfileState } = profilePageSlice.actions;
                                                                                                                                                                 