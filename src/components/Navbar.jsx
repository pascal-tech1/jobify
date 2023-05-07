import React from 'react';
import styled from 'styled-components';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, toggleUserOpen } from '../features/layoutSlice/layoutSlice';

const Navbar = () => {
  const { isSidebarOpen, isUserOpen } = useSelector((store) => store.layoutSlice);
  const { user } = useSelector((store) => store.userSlice);
  const dispatch = useDispatch();
  const { name } = user;

  return (
    <Wrapper>
      <FaAlignLeft className='toogle-icon' onClick={() => dispatch(toggleSidebar(!isSidebarOpen))} />
      <h1>Dashboard</h1>
      <div className='user-btn'>
        <UserBtn onClick={() => dispatch(toggleUserOpen(!isUserOpen))}>
          <FaUserCircle className='user-logo' />
          <h3>{name}</h3>
          <FaCaretDown className='caret-down' />
        </UserBtn>

        <LogoutBtn className={isUserOpen ? 'userOpen' : ''}>
          <h3>Logout</h3>
        </LogoutBtn>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  z-index: 1000;
  grid-row: 1/2;
  grid-column: 3 / center-end;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffff;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;
  position: relative;
  
  .toogle-icon {
    font-size: 3rem;
    color: var(--primary-500);
    transition: var(--transition);
    :hover {
      color: var(--primary-400);
    }
  }
  h1 {
    font-size: 3rem;
    font-weight: 400;
  }
  .user-btn {
    transition: var(--transition);
  }
  @media screen and (max-width: 760px) {
    h1 {
      font-size: 2rem;
    }
    .toogle-icon {
      font-size: 1.8rem;
    }
  }
  @media screen and (max-width: 300px) {
    grid-column: 2 / -1;
    h1 {
      font-size: 1rem;
    }
    .toogle-icon {
      font-size: 1.5rem;
    }
  }
`;

// user button
const UserBtn = styled.button`
  all: unset;
  background-color: var(--primary-500);
  align-items: center;
  padding: 0.4rem 0.5rem;
  display: flex;
  width: 12rem;
  border-radius: 5px;
  color: #ffff;
  font-weight: 100;
  font-size: 1rem;
  transition: var(--transition);

  :hover {
    background-color: var(--primary-700);
  }
  .user-logo {
    font-size: inherit;
  }
  h3 {
    margin: 0 auto;
    font-size: 1.7rem;
    font-weight: inherit;
  }
  .caret-down {
    font-size: 1.5rem;
  }
  @media screen and (min-width: 760px) and (max-width: 1200px) {
    width: 9rem;
    font-size: 2rem;
    h3 {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 760px) {
    width: 7.2rem;
    font-size: 1.7rem;
    h3 {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 200px) {
    width: 5rem;
    justify-content: space-between;
    h3 {
      display: none;
    }
  }
`;

// logout button
const LogoutBtn = styled(UserBtn)`
  position: absolute;
  top: 7.2rem;
  right: 0px;
  background-color: red;
  display: none;
  :hover {
    background-color: red;
  }
  .inactive {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    top: 6.5rem;
  }
  @media screen and (max-width: 200px) {
    top: 3.5rem;
    h3 {
      display: flex;
    }
  }
  &.userOpen {
    display: block;
  }
`;
