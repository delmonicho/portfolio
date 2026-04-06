import { workHistory } from '../constants/constants';

export default function work() {
  const rows = workHistory.map(
    ({ year, company, title, desc }) =>
      `│  ${year.padEnd(13)}│  ${company.padEnd(12)}│  ${title.padEnd(24)}│  ${desc.padEnd(44)}│`
  );

  return `
┌───────────────┬──────────────┬──────────────────────────┬──────────────────────────────────────────────┐
│  YEAR         │  COMPANY     │  ROLE                    │  DETAILS                                     │
├───────────────┼──────────────┼──────────────────────────┼──────────────────────────────────────────────┤
${rows.join('\n')}
└───────────────┴──────────────┴──────────────────────────┴──────────────────────────────────────────────┘`.trim();
}
