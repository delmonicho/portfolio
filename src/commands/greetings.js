const RESPONSES = [
  "hey.",
  "hello there.",
  "hey — glad you stopped by.",
  "hi!",
  "oh hey.",
  "hello.",
  "hey, you found me.",
  "yo.",
];

export default function greetingCmd() {
  return RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
}
