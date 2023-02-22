import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = (props) => (
  <Section row nopadding>
    <LeftSection>
      <SectionTitle main center>
        nicho del moral <br />
      </SectionTitle>
      <SectionText>
        The purpose of this portfolio is to showcase nicho's experience and 
        inform future collaborators and employers of nicho's skills
      </SectionText>
      <Button onClick={() => window.location="google.com"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;