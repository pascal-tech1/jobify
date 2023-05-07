import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/images/logo.svg';
import links from '../utils/links';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  const { isSidebarOpen, } = useSelector((store) => store.layoutSlice);
  return (
    <Wrapper>
      <div className={isSidebarOpen ? 'isOpen' : ''}>
        <img src={Logo} alt='logo' />
        {links?.map((link) => {
          const { id, icon, text, path,} = link;

          return (
            <NavLink
            key={id}
            to={path}
          >
            {icon}
            <h3>{text}</h3>
          </NavLink>
          
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  grid-row: 1/-1;
  grid-column: 1/2;
  height: 100vh;
  z-index: 100;
  background-color: #ffff;

  div {
    @media screen and (min-width: 760px) and (max-width: 1200px) {
      img {
        padding: 3rem 1.5rem !important;
        width: 85%;
      }
      a {
        h3 {
          display: none;
        }
      }
    }
    @media screen and (max-width: 760px) {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #ffff;
      margin-top: 2.2rem;
      display: none;
      box-shadow: var(--shadow-4);
      img {
        width: 90%;
        margin-top: 6rem;
      }
      &.isOpen {
        display: block !important;
      }
    }
    &.isOpen {
      display: none;
    }
    img {
      margin-bottom: 2rem;
      padding: 2rem 3.5rem;
    }
    a {
      font-size: 1.5rem;
      gap: 2.5rem;
      text-decoration: none;
      color: var(--textColor);
      text-transform: capitalize;
      font-weight: 100;
      display: flex;
      padding: 1.5rem 0;
      padding: 2rem 3.5rem;
      transition: 0.3s ease-in-out all;

      :hover {
        background-color: var(--primary-50);
        transform: translateX(0.5rem);
        color: var(--primary-500);
      }

      h3 {
        font-weight: inherit;
      }
      svg {
        font-size: 2rem;
      }
    }
    .active {
      color: var(--primary-500);
    }
  }
`;
