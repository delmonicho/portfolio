import { skills } from '../constants/constants';

export default function skillsCmd() {
  const max = Math.max(
    skills.frontend.length,
    skills.backend.length,
    skills.datascience.length,
    skills.ai.length
  );

  const rows = Array.from({ length: max }, (_, i) => {
    const ai = (skills.ai[i]          || '').padEnd(20);
    const fe = (skills.frontend[i]    || '').padEnd(14);
    const be = (skills.backend[i]     || '').padEnd(14);
    const ds = (skills.datascience[i] || '').padEnd(18);
    return `│  ${ai}│  ${fe}│  ${be}│  ${ds}│`;
  });

  return `
┌──────────────────────┬────────────────┬────────────────┬────────────────────┐
│  AI STACK            │  FRONTEND      │  BACKEND       │  DATA SCIENCE      │
├──────────────────────┼────────────────┼────────────────┼────────────────────┤
${rows.join('\n')}
└──────────────────────┴────────────────┴────────────────┴────────────────────┘`.trim();
}
