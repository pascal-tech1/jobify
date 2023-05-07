import React from 'react';
import styled from 'styled-components';
import mainLogo from '../assets/images/main.svg';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Wrapper className='container'>
      <nav>
        <img src={logo} alt='logo' />
      </nav>

      <main>
        <div className='info'>
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>Crucifix narwhal street art asymmetrical, humblebrag tote bag pop-up fixie raclette taxidermy craft beer. Brunch bitters synth, VHS crucifix heirloom meggings bicycle rights.</p>
          <Link className='link' to={'register'}>
            Loin/Register
          </Link>
        </div>
        <div className='mainLogoContainer'>
          <img src={mainLogo} alt='mainLogo' />
        </div>
      </main>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  height: 100vh;
  margin-left: 2rem;
  nav {
    margin-bottom: 1rem;
  }
  main {
    display: flex;
    flex-direction: column;
    .mainLogoContainer {
      display: none;
    }
  }

  .info {
    .link {
      all: unset;
      background-color: var(--primary-500);
      color: #ffff;
      padding: 0.7rem 3.5rem;
      font-size: 1.3rem;
      border-radius: 10px;
      margin-bottom: 1rem;
      :hover {
        background-color: var(--primary-400);
      }
    }
    p {
      font-size: 1.3rem;
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 2rem;

      span {
        color: var(--primary-500);
      }
    }
  }
  @media screen and (min-width: 920px) {
    margin-left: 7rem;
    nav {
      margin-top: 2rem;
    }
    main {
      flex-direction: row;
    }
    .mainLogoContainer {
      order: 2;
      margin-top: -3rem;
    }
    .info {
      margin-top: -9rem;
      p {
        font-size: 1rem;
        margin-top: -2rem;
      }
    }
  }

  @media screen and (min-width: 768px) {
    main {
      justify-content: center;
      align-items: center;
    }
    .mainLogoContainer {
      display: flex !important;
      justify-self: center;
      /* img {
        width: 50vw;
      } */
    }
    .info {
      order: 2;
      h1 {
        font-size: 3rem !important;
      }
      width: 700px;
    }
  }
  @media screen and (max-width: 200px) {
    margin-left: 0.2rem;
    main {
      justify-content: center;
      align-items: center;
    }
    nav {
      img {
        width: 4rem;
      }
    }
    .info {
      margin-top: -1rem;
      h1 {
        font-size: 0.7rem;
      }
      p {
        font-size: 0.6rem;
        margin-bottom: 0.8rem;
      }
      button {
        font-size: 0.8rem;
        padding: 0.3rem 1.6rem;
      }
    }
  }
`;
//  @media screen and (max-width: 768 px) {
//     /* Styles for screens up to 768px wide */

//     grid-template-columns: repeat(2, 1fr);
//     padding: 10px;
//   }

//   @media screen and (max-width: 480px) {
//     /* Styles for screens up to 480px wide */
//     grid-template-columns: 1fr;
//     padding: 5px;
//   }
