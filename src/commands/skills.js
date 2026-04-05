import { skills } from '../constants/constants';

export default function skillsCmd() {
  const max = Math.max(
    skills.frontend.length,
    skills.backend.length,
    skills.datascience.length
  );

  const rows = Array.from({ length: max }, (_, i) => {
    const fe = (skills.frontend[i] || '').padEnd(14);
    const be = (skills.backend[i] || '').padEnd(14);
    const ds = (skills.datascience[i] || '').padEnd(18);
    return `│  ${fe}│  ${be}│  ${ds}│`;
  });

  return `
┌────────────────┬────────────────┬────────────────────┐
│  FRONTEND      │  BACKEND       │  DATA SCIENCE      │
├────────────────┼────────────────┼────────────────────┤
${rows.join('\n')}
└────────────────┴────────────────┴────────────────────┘`.trim();
}
