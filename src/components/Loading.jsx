import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return <Span className='loader'></Span>;
};

export default Loading;

const Span = styled.span`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #fff #fff transparent;
  box-sizing: border-box;
  animation: rotation 1.3s linear infinite;

  ::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 3px solid;
    border-color: transparent var(--grey-500) var(--grey-300);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: rotationBack 0.7s linear infinite;
    transform-origin: center center;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;
