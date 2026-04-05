import { about } from '../constants/constants';

export default function whoami() {
  return `${about.name} — ${about.role} — ${about.location}`;
}
