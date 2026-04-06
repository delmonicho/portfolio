import aboutCmd from './about';
import work from './work';
import projectsCmd from './projects';
import skillsCmd from './skills';

const FS = {
  '/':         { children: ['about', 'work', 'projects', 'skills'] },
  '/about':    { children: ['ABOUT.md'] },
  '/work':     { children: ['WORK.md'] },
  '/projects': { children: ['PROJECTS.md'] },
  '/skills':   { children: ['SKILLS.md'] },
};

const FILE_CONTENT = {
  'ABOUT.md':    aboutCmd,
  'WORK.md':     work,
  'PROJECTS.md': projectsCmd,
  'SKILLS.md':   skillsCmd,
};

function ok(output = null, cdTo = null) {
  return { output, isClear: false, isContact: false, cdTo };
}

function err(msg) {
  return { output: msg, isClear: false, isContact: false, cdTo: null };
}

export function handleLs(currentDir) {
  const node = FS[currentDir];
  if (!node) return err(`ls: ${currentDir}: no such directory`);

  if (currentDir === '/') {
    return ok(node.children.map(d => `${d}/`).join('   '));
  }
  return ok(node.children.join('   '));
}

export function handleCd(raw, currentDir) {
  const arg = raw.trim().slice(2).trim().toLowerCase();

  if (!arg || arg === '/' || arg === '~') return ok(null, '/');
  if (arg === '..') return ok(null, '/');

  const target = arg.startsWith('/') ? arg : `/${arg}`;

  if (!FS[target]) {
    return err(`cd: ${arg}: No such directory\navailable: ${FS['/'].children.join(', ')}`);
  }
  return ok(null, target);
}

export function handleCat(raw, currentDir) {
  if (currentDir === '/') {
    return err("cat: no files at root — try 'ls' to see directories");
  }

  const rawFilename = raw.trim().slice(3).trim();
  const node = FS[currentDir];
  const match = node?.children.find(f => f.toLowerCase() === rawFilename.toLowerCase());

  if (!match) {
    const available = node?.children.join(', ') || 'none';
    return err(`cat: ${rawFilename}: No such file\navailable: ${available}`);
  }

  const handler = FILE_CONTENT[match];
  if (!handler) return err(`cat: ${match}: cannot read`);

  return ok(handler());
}
