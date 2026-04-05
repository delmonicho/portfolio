import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 0.75rem;
`;

const CommandEcho = styled.div`
  color: ${props => props.theme.dimText};
  margin-bottom: 0.25rem;
  &::before {
    content: 'nicho@portfolio:~$ ';
    color: ${props => props.theme.text};
  }
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

export default function OutputBlock({ command, output, isError, isSuccess }) {
  return (
    <Wrapper>
      {command !== null && <CommandEcho>{command}</CommandEcho>}
      {output && (
        <Output isError={isError} isSuccess={isSuccess}>
          {output}
        </Output>
      )}
    </Wrapper>
  );
}
