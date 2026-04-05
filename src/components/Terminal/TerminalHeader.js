import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  flex-shrink: 0;
  user-select: none;
`;

const Title = styled.span`
  color: ${props => props.theme.dimText};
  font-size: 0.85em;
`;

export default function TerminalHeader() {
  return (
    <Bar>
      <Title>nicho@portfolio: ~</Title>
    </Bar>
  );
}
