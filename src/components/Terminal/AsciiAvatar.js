import styled from 'styled-components';

const avatar = `
         .-------.
        /  o   o  \\
       |   .___,   |
       |   \\   /   |
        \\   ---   /
    _____|_______|_____
   /                   \\
  /   nicho del moral   \\
 /                       \\
'-------------------------'
`.trim();

const Pre = styled.pre`
  color: ${props => props.theme.text};
  font-family: ${props => props.theme.font};
  line-height: 1.4;
  text-align: center;
  margin: 0 auto 1.5rem;
  opacity: 0.9;
`;

export default function AsciiAvatar() {
  return <Pre>{avatar}</Pre>;
}
