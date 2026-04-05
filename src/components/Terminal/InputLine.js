import { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  position: relative;
`;

const Prompt = styled.span`
  color: ${props => props.theme.text};
  white-space: pre;
  flex-shrink: 0;
`;

const Typed = styled.span`
  color: ${props => props.theme.accent};
  white-space: pre;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 0.6em;
  height: 1.1em;
  background: ${props => props.theme.text};
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
  margin-left: 1px;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  border: none;
  outline: none;
  caret-color: transparent;
`;

export default function InputLine({ value, onChange, onKeyDown, prompt }) {
  const inputRef = useRef(null);

  // Always keep input focused
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  });

  const handleClick = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <Row onClick={handleClick}>
      <Prompt>{prompt || 'nicho@portfolio:~$ '}</Prompt>
      <Typed>{value}</Typed>
      <Cursor />
      <HiddenInput
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-label="terminal input"
      />
    </Row>
  );
}
