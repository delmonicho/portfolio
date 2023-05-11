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
        full stack software dev x machine learning hobbyist
      </SectionText>
      <Button onClick={() => window.location="https://www.linkedin.com/in/nicho-del-moral/"}>Learn More</Button>
    </LeftSection>
  </Section>
);

export default Hero;