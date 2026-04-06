import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 0.75rem;
`;

const CommandEchoPre = styled.div`
  color: ${props => props.theme.dimText};
  margin-bottom: 0.25rem;
`;

const PromptSpan = styled.span`
  color: ${props => props.theme.text};
`;

const Output = styled.pre`
  color: ${props =>
    props.isError ? props.theme.error
    : props.isSuccess ? props.theme.success
    : props.theme.text};
  font-family: ${props => props.theme.font};
  font-size: inherit;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
`;

const NLEcho = styled.pre`
  color: ${props => props.theme.accentYellow};
  font-family: ${props => props.theme.font};
  font-size: inherit;
  font-style: italic;
  white-space: pre-wrap;
  margin-bottom: 0.1rem;
  line-height: 1.5;
`;

const DEFAULT_PROMPT = '$ ';

export default function OutputBlock({ command, output, isError, isSuccess, isNL, prompt }) {
  return (
    <Wrapper>
      {command !== null && (
        <CommandEchoPre>
          <PromptSpan>{prompt || DEFAULT_PROMPT}</PromptSpan>
          {command}
        </CommandEchoPre>
      )}
      {isNL && output && <NLEcho>{output}</NLEcho>}
      {!isNL && output && (
        React.isValidElement(output) ? (
          output
        ) : (
          <Output isError={isError} isSuccess={isSuccess}>
            {output}
          </Output>
        )
      )}
    </Wrapper>
  );
}
