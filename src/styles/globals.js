import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #__next {
    height: 100%;
    width: 100%;
    background: #0d0d0d;
    color: #00ff41;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  ::selection {
    background: #00ff41;
    color: #0d0d0d;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #0d0d0d;
  }
  ::-webkit-scrollbar-thumb {
    background: #00ff41;
    border-radius: 3px;
  }
`;

export default GlobalStyles;
