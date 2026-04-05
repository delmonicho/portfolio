import { about } from '../constants/constants';

export default function aboutCmd() {
  return `
┌─────────────────────────────────────────────────────┐
│                    ABOUT NICHO                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Name    :  ${about.name.padEnd(38)}│
│  Role    :  Full Stack Dev × ML Hobbyist            │
│  Home    :  ${about.location.padEnd(38)}│
│                                                     │
├─────────────────────────────────────────────────────┤
│  Origin  :  Born in Los Angeles                     │
│             Raised in Green Bay, WI                 │
│             Graduated in Hawaii                     │
├─────────────────────────────────────────────────────┤
│  Interests:  World traveler, musician,              │
│              enthusiast of well-designed            │
│              experiences                            │
├─────────────────────────────────────────────────────┤
│  Email   :  ${about.email.padEnd(38)}│
│  GitHub  :  ${about.github.padEnd(38)}│
│  LinkedIn:  ${about.linkedin.padEnd(38)}│
└─────────────────────────────────────────────────────┘
  "${about.tagline}"`.trim();
}
