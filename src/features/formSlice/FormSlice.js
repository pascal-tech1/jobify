import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isMember: false,
  isEmailValid: false,
  isNameValid: false,
  isPasswordValid: false,
  isEmailFirstTime: true,
  isNameFirstTime: true,
  isPasswordFirstTime: true,
  isFormValid: false,
  name: '',
  email: '',
  password: '',
  timer: null,
};
const formSlice = createSlice({
  name: 'FormSlice',
  initialState,
  reducers: {
    toggleMemberShip: (state, action) => {
      state.isMember = action.payload;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export default formSlice.reducer;
export const { updateField, setErrors, toggleMemberShip, toggleIsFormVAlid } = formSlice.actions;
