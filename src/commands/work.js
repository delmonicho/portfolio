import { workHistory } from '../constants/constants';

export default function work() {
  const rows = workHistory.map(
    ({ year, title, desc }) =>
      `│  ${year}  │  ${title.padEnd(24)}│  ${desc.padEnd(44)}│`
  );

  return `
┌────────┬──────────────────────────┬──────────────────────────────────────────────┐
│  YEAR  │  ROLE / MILESTONE        │  DETAILS                                     │
├────────┼──────────────────────────┼──────────────────────────────────────────────┤
${rows.join('\n')}
└────────┴──────────────────────────┴──────────────────────────────────────────────┘`.trim();
}
