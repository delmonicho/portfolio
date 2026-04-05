import { projects } from '../constants/constants';

function wrapText(text, width) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= width) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function projectCard(project) {
  const W = 48; // inner width
  const titleLine = project.title.substring(0, W);
  const descLines = wrapText(project.description, W);
  const stackLine = ('Stack: ' + project.stack.join(' · ')).substring(0, W);

  const top    = `╔${'═'.repeat(W + 2)}╗`;
  const bottom = `╚${'═'.repeat(W + 2)}╝`;
  const div    = `╠${'═'.repeat(W + 2)}╣`;

  const pad = (str) => `║  ${str.padEnd(W)}  ║`;

  const lines = [
    top,
    pad(titleLine),
    div,
    ...descLines.map(pad),
    div,
    pad(stackLine),
    bottom,
  ];

  return lines.join('\n');
}

export default function projectsCmd() {
  return projects.map(projectCard).join('\n\n');
}
