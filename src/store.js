import { configureStore } from '@reduxjs/toolkit';
import formSlice from './features/formSlice/FormSlice';
import userSlice from './features/userSlice/userSlice';
import layoutSlice from './features/layoutSlice/layoutSlice';
import profilePageSlice from './features/pageSlice/profilePageSlice';
import addJobPageSlice from './features/addJobSlice/addJobPageSlice';
import allJobSlice from './features/allJobSlice/allJobSlice';
export const store = configureStore({
  reducer: {
    formSlice: formSlice,
    userSlice: userSlice,
    layoutSlice: layoutSlice,
    profilePageSlice: profilePageSlice,
    addJobPageSlice: addJobPageSlice,
    allJobSlice: allJobSlice
  },
});
