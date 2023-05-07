// Name validation
import { toast } from 'react-toastify';

const validateInput = (dispatch, modifyState, name, value) => {
  // Name validation
  if (name === 'name') {
    dispatch(modifyState({ field: 'isNameFirstTime', value: false }));

    if (value.trim().length < 3) {
      dispatch(modifyState({ field: 'isNameValid', value: false }));

      toast.error('name is required\nName must be at least 3 characters');
    } else {
      dispatch(modifyState({ field: 'isNameValid', value: true }));
    }
  }
  if (name === 'password') {
    dispatch(modifyState({ field: 'isPasswordFirstTime', value: false }));

    const hasLowercase = /[a-z]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    // const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasSymbol = /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\}\[\]\:\;\"\'\<\>\,\.\?\/\~\`]/.test(value);
    if (value.trim().length < 8) {
      toast.error('password is required and must be greater than 8');
      dispatch(modifyState({ field: 'isPasswordValid', value: false }));
    } else if (!hasUppercase) {
      toast.error(' Password must include upperCase');
      dispatch(modifyState({ field: 'isPasswordValid', value: false }));
    } else if (!hasLowercase) {
      toast.error(' Password must include lowercase');
      dispatch(modifyState({ field: 'isPasswordValid', value: false }));
    } else if (!hasSymbol) {
      toast.error(' Password must include symbol');
      dispatch(modifyState({ field: 'isPasswordValid', value: false }));
    } else if (!hasNumber) {
      toast.error(' Password must include number');
      dispatch(modifyState({ field: 'isPasswordValid', value: false }));
    } else {
      dispatch(modifyState({ field: 'isPasswordValid', value: true }));
    }
  }
  // Email validation
  if (name === 'email') {
    dispatch(modifyState({ field: 'isEmailFirstTime', value: false }));

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (value.trim().length < 1) {
      dispatch(modifyState({ field: 'isEmailValid', value: false }));

      toast.error('email is required');
    } else if (!emailRegex.test(value.trim())) {
      dispatch(modifyState({ field: 'isEmailValid', value: false }));

      toast.error('Invalid email address');
    } else {
      dispatch(modifyState({ field: 'isEmailValid', value: true }));
    }
  }
};
export default validateInput;
