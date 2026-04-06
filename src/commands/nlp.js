// Ordered by descending priority — earlier entries win ties.
// 'about' is last because it contains broad patterns ('tell me about') that
// overlap with every other intent.
const INTENTS = [
  {
    patterns: ['work', 'experience', 'where has nicho worked', 'jobs', 'career', 'employment'],
    command: 'cd /work && cat WORK.md',
  },
  {
    patterns: ['projects', 'portfolio', 'what has nicho built', 'show me work', 'what did you build'],
    command: 'cd /projects && cat PROJECTS.md',
  },
  {
    patterns: ['skill', 'tech', 'technologies', 'what does nicho know', 'tools'],
    command: 'cd /skills && cat SKILLS.md',
  },
  {
    patterns: ['who is nicho', 'about nicho', 'tell me about', 'who are you', 'introduce', 'bio'],
    command: 'cd /about && cat ABOUT.md',
  },
];

/**
 * Detect natural language intent in user input.
 * Returns { isNL: true, resolvedCommand } if matched, null otherwise.
 * Skips inputs that look like actual shell commands.
 *
 * Precedence: score each intent by number of matching patterns.
 * Highest score wins; ties are broken by INTENTS order (earlier = higher priority).
 */
export function detectIntent(raw) {
  const lower = raw.toLowerCase().trim();

  // Skip single-word inputs and known command prefixes
  if (!lower.includes(' ')) return null;
  if (/^(cd|ls|cat|help|whoami|about|work|projects|skills|clear|contact)\b/.test(lower)) return null;

  let best = null;
  let bestScore = 0;

  for (const intent of INTENTS) {
    const score = intent.patterns.filter(p => lower.includes(p)).length;
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  return best ? { isNL: true, resolvedCommand: best.command } : null;
}
