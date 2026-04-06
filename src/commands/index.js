import help from './help';
import whoami from './whoami';
import aboutCmd from './about';
import work from './work';
import projectsCmd from './projects';
import skillsCmd from './skills';
import clear, { CLEAR_SENTINEL } from './clear';
import { handleLs, handleCd, handleCat } from './fs';
import { detectIntent } from './nlp';
import greetingCmd from './greetings';
import { about } from '../constants/constants';

const GREETING_RE = /^(hi|hello|hey|sup|yo|howdy|hola|greetings|heya|hiya|what'?s up)$/;

const commands = {
  help,
  whoami,
  about: aboutCmd,
  work,
  projects: projectsCmd,
  skills: skillsCmd,
  clear,
};

/**
 * Route a raw input string to its handler.
 * Strips a leading slash, lowercases, and trims.
 * Returns { output, isClear, isContact, cdTo, isNL?, resolvedCommand? }
 */
export function runCommand(raw, currentDir = '/') {
  const trimmed = raw.trim().replace(/^\//, '');
  const normalized = trimmed.toLowerCase();

  // 1. LinkedIn — open in new tab whenever the word appears
  if (normalized.includes('linkedin')) {
    return { output: '→ opening linkedin...', url: `https://${about.linkedin}`, isClear: false, isContact: false, cdTo: null };
  }

  // 2. Greetings
  if (GREETING_RE.test(normalized)) {
    return { output: greetingCmd(), isClear: false, isContact: false, cdTo: null };
  }

  // 2. Natural language detection
  const nlResult = detectIntent(raw.trim());
  if (nlResult) return { ...nlResult, isClear: false, isContact: false, cdTo: null };

  // 4. Contact form
  if (normalized === 'contact') {
    return { output: null, isClear: false, isContact: true, cdTo: null };
  }

  // 5. Filesystem commands
  if (normalized === 'ls') return handleLs(currentDir);
  if (normalized === 'cd' || normalized.startsWith('cd ')) return handleCd(trimmed, currentDir);
  if (normalized.startsWith('cat ')) return handleCat(trimmed, currentDir);

  // 6. Existing named commands
  const handler = commands[normalized];

  if (!handler) {
    return {
      output: `command not found: ${raw.trim()}\ntype 'help' to see available commands`,
      isClear: false,
      isContact: false,
      cdTo: null,
    };
  }

  const result = handler();
  return {
    output: result,
    isClear: result === CLEAR_SENTINEL,
    isContact: false,
    cdTo: null,
  };
}
