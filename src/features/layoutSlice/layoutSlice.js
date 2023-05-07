import { createSlice } from '@reduxjs/toolkit';




const initialState = {
  isSidebarOpen: false,
  isUserOpen: false,
 
  linkActiveId: 1,
  isActive: false,
  

};

const layoutSllice = createSlice({
  name: 'layoutSlice',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    toggleUserOpen: (state, action) => {
      state.isUserOpen = action.payload;
    },
  },
});

export const { toggleSidebar, toggleUserOpen, toggleActiveLinks, changeIsActiveLinkId } = layoutSllice.actions;
export default layoutSllice.reducer;
