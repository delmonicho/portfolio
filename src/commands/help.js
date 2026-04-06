export default function help() {
  return `
┌─────────────────────────────────────────────┐
│             AVAILABLE COMMANDS              │
├─────────────────────────────────────────────┤
│  ls          →  list directory contents     │
│  cd /about   →  navigate to a section       │
│  cat FILE.md →  read file in current dir    │
│  cd ..       →  go back to root             │
├─────────────────────────────────────────────┤
│  /about      →  who is nicho?               │
│  /work       →  work experience             │
│  /projects   →  portfolio projects          │
│  /skills     →  technical skills            │
│  /contact    →  send me a message           │
│  whoami      →  quick bio                   │
│  clear       →  clear the terminal          │
└─────────────────────────────────────────────┘`.trim();
}
