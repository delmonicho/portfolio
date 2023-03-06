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
        full stack software dev x machine learning engineer
      </SectionText>
      <Button onClick={() => window.location="google.com"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;