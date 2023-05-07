import React from 'react';
import styled from 'styled-components';
import logo from '../assets/images/logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, toggleMemberShip } from '../features/formSlice/FormSlice';
import validateInput from '../utils/formValidation.js';
import { registerUser, loginUser } from '../features/userSlice/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const { name, email, password, isMember, isEmailValid, isNameValid, isPasswordValid, timer, isNameFirstTime, isEmailFirstTime, isPasswordFirstTime, isFormvalid } = useSelector((store) => store.formSlice);
  const { user } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  });
  useEffect(() => {
    const validForm = isMember ? isEmailValid && isPasswordValid : isNameValid && isEmailValid && isPasswordValid;
    dispatch(updateField({ field: 'isFormvalid', value: validForm }));
  }, [isMember, isEmailValid, isPasswordValid, isNameValid]);
  const handleChange = (e) => {
    const { value, name } = e.target;

    dispatch(updateField({ field: name, value: value }));

    // Clear the previous timer
    clearTimeout(timer);
    // Set a new timer to validate the input after 2 seconds
    const newTimer = setTimeout(() => {
      validateInput(dispatch, updateField, name, value);
    }, 2000);
    // Update the timer state variable
    dispatch(updateField({ field: 'timer', value: newTimer }));
  };
  const handleBlur = (e) => {
    const { value, name } = e.target;
    validateInput(dispatch, updateField, name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    isMember ? dispatch(loginUser({ name, email, password })) : dispatch(registerUser({ name, email, password }));
  };

  return (
    <Wrapper>
      <div className='center'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>

        {isMember ? <h1>Login</h1> : <h1>Register</h1>}
        <form onSubmit={isFormvalid ? handleSubmit : (e) => e.preventDefault()} noValidate>
          {!isMember && <label htmlFor='name'>Name</label>}

          {!isMember && <input type='text' id='name' name='name' value={name} onChange={handleChange} className={isNameFirstTime || isNameValid ? '' : 'invalid'} onBlur={handleBlur} />}
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' value={email} onChange={handleChange} className={isEmailFirstTime || isEmailValid ? '' : 'invalid'} onBlur={handleBlur} />
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' name='password' value={password} onChange={handleChange} className={isPasswordFirstTime || isPasswordValid ? '' : 'invalid'} onBlur={handleBlur} />

          <button className={isFormvalid ? '' : 'disabled'} type='submit'>
            Submit
          </button>
        </form>
        {isMember ? (
          <div className='toggleform'>
            {'Not a member'}
            <button onClick={() => dispatch(toggleMemberShip(false))}>Register</button>
          </div>
        ) : (
          <div className='toggleform'>
            {'Already a member'}
            <button onClick={() => dispatch(toggleMemberShip(true))}>Login</button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Form;
const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  .center {
    display: flex;
    align-items: center;

    margin-top: 2rem;
    background-color: var(--white);
    padding: 2rem;
    display: grid;
    border-top: 5px solid var(--primary-500);
    box-shadow: var(--shadow-2);
    border-radius: 5px;
    max-width: 400px;
    width: 90vw;
  }
  .logo {
    justify-self: center;
  }
  h1 {
    justify-self: center;
    margin-top: -0.4rem;
    font-weight: 300;
    color: var(--black);
  }
  form {
    margin-top: -2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    label {
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }
    input {
      all: unset;
      padding: 0.2rem 1rem;
      background-color: #f0f4f8;
      border: 1px solid var(--primary-200);
      border-radius: 5px;
      :focus {
        border: 1px solid var(--primary-500);
      }
    }
    .invalid {
      border-bottom: 1px solid red !important;
    }
    .disabled {
      background-color: var(--primary-200);
      :hover {
        background-color: var(--primary-200);
      }
    }
    button {
      all: unset;
      background-color: var(--primary-500);
      padding: 0.3rem 2rem;
      border-radius: 5px;
      margin-top: 1rem;
      color: var(--white);
      text-align: center;

      :hover {
        cursor: pointer;
        background-color: var(--primary-400);
      }
    }
  }
  .toggleform {
    justify-self: center;
    button {
      all: unset;
      padding: 0.3rem 1rem;
      border-radius: 5px;
      margin-top: 1rem;
      color: var(--primary-500);
      text-align: center;
      :hover {
        cursor: pointer;
        color: var(--primary-400);
      }
    }
  }
  @media screen and (max-width: 200px) {
    .center {
      padding: 0;
      margin-top: 0.2rem;
      width: 80vw;
    }
    .logo {
      img {
        width: 40vw;
      }
    }
    h1 {
      font-size: 0.8rem;
    }
    form {
      margin-top: -0.5rem;
      margin: 0 0.7rem;
      label {
        font-size: 0.6rem;
        margin-bottom: 0.2rem;
      }
      input {
        padding: 0 0 !important;
        width: 60vw;
        height: 20px;
        border-radius: 2px;
      }
      button {
        padding: 0 0;
        margin-top: 0.5rem;
      }
    }
    .toggleform {
      font-size: 0.8rem;
      margin: 0 0.3rem;
      button {
        padding: 0rem 0rem;
        border-radius: 3px;
        margin-top: 0rem;
      }
    }
  }
`;
