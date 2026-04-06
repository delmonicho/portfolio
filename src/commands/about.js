import { about } from '../constants/constants';

export default function aboutCmd() {
  const W = 53;
  const T = '─'.repeat(W);
  const top    = `┌${T}┐`;
  const sep    = `├${T}┤`;
  const bottom = `└${T}┘`;
  const blank  = `│${' '.repeat(W)}│`;

  const c = (s) => {
    const pad = W - s.length;
    const l = Math.floor(pad / 2);
    return `│${' '.repeat(l)}${s}${' '.repeat(pad - l)}│`;
  };
  const ln = (s) => `│${s.padEnd(W)}│`;

  return [
    top,
    c("hey, i'm nicho."),
    sep,
    blank,
    ln(`  full-stack + AI-native engineer based in`),
    ln(`  Brooklyn, NY. born in LA, grew up in Green`),
    ln(`  Bay WI, graduated in Hawaii.`),
    blank,
    sep,
    ln(`  i build things that focus on adding value to`),
    ln(`  people's flows. lately deep into agentic`),
    ln(`  interfaces, MCP tooling, CLIs + Claude skills.`),
    sep,
    ln(`  reach me:`),
    ln(`    ${about.email}`),
    ln(`    ${about.github}`),
    ln(`    ${about.linkedin}`),
    bottom,
    `  "${about.tagline}"`,
  ].join('\n');
}
