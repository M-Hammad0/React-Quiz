import styled, { createGlobalStyle } from 'styled-components';
import BGImage from './images/background.jpg'

export const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    background-image: url(${BGImage});
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }
  * {
    font-family: 'Catamaran', sans-serif;
    box-sizing: border-box;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }
  .score {
    color: #000;
    font-size: 2rem;
    margin: 0;
  }
  h1 {
    font-family: Fascinate Inline;
    background-color: black;
    font-weight: 400;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
    filter: drop-shadow(2px 2px #411f1f);
    font-size: 5rem;
    text-align: center;
    margin: 10% 20px 5% 20px;
  }
  @media (max-width: 576px) {
    h1 {
      font-size: 3rem;
    } 
  }
  .start, .next {
    cursor: pointer;
    background: black;
    color: #fff;
    border: 2px solid #000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
  }
  .start {
    max-width: 200px;
  }
`;