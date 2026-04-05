import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid ${props => props.theme.border};
  flex-shrink: 0;
  user-select: none;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  opacity: 0.8;
`;

const Title = styled.span`
  color: ${props => props.theme.dimText};
  font-size: 0.85em;
`;

export default function TerminalHeader() {
  return (
    <Bar>
      <Dots>
        <Dot color="#ff5f57" />
        <Dot color="#febc2e" />
        <Dot color="#28c840" />
      </Dots>
      <Title>nicho@portfolio: ~</Title>
      <span style={{ width: 54 }} />
    </Bar>
  );
}
