import help from './help';
import whoami from './whoami';
import aboutCmd from './about';
import work from './work';
import projectsCmd from './projects';
import skillsCmd from './skills';
import clear, { CLEAR_SENTINEL } from './clear';

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
 * Returns { output: string, isClear: bool, isContact: bool }
 */
export function runCommand(raw) {
  const normalized = raw.trim().replace(/^\//, '').toLowerCase();

  if (normalized === 'contact') {
    return { output: null, isClear: false, isContact: true };
  }

  const handler = commands[normalized];

  if (!handler) {
    return {
      output: `command not found: ${raw.trim()}\ntype 'help' to see available commands`,
      isClear: false,
      isContact: false,
    };
  }

  const result = handler();
  return {
    output: result,
    isClear: result === CLEAR_SENTINEL,
    isContact: false,
  };
}
