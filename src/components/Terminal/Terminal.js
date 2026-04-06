import { useState, useReducer, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import TerminalHeader from './TerminalHeader';
import HistoryBlock from './HistoryBlock';
import InputLine from './InputLine';
import { runCommand } from '../../commands/index';

// ─── Styled Components ────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.bg};
  font-family: ${props => props.theme.font};
  font-size: 14px;
  color: ${props => props.theme.text};
  cursor: text;
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.5rem 1.5rem;
`;

const ContactPrompt = styled.div`
  color: ${props => props.theme.accentYellow};
  margin-bottom: 0.25rem;
  font-size: 0.9em;
`;

// ─── Welcome Output ───────────────────────────────────────────────────────────

const WELCOME_TEXT = `Welcome to nicho's portfolio terminal.
──────────────────────────────────────`;

// ─── Reducer ─────────────────────────────────────────────────────────────────

function historyReducer(state, action) {
  switch (action.type) {
    case 'PUSH':
      return [...state, action.entry];
    case 'CLEAR':
      return [{ type: 'welcome', output: WELCOME_TEXT }];
    default:
      return state;
  }
}

// ─── Contact Form Prompts ─────────────────────────────────────────────────────

const CONTACT_PROMPTS = {
  name:    'Enter your name:    ',
  email:   'Enter your email:   ',
  message: 'Enter your message: ',
  confirm: 'Send message? [y/n] ',
};

// ─── Terminal Component ───────────────────────────────────────────────────────

export default function Terminal() {
  const [history, dispatch] = useReducer(historyReducer, [
    { type: 'welcome', output: WELCOME_TEXT },
  ]);

  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/');

  // Contact form state machine: null | { step, data }
  const [contact, setContact] = useState(null);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, contact]);

  // Build the shell prompt string for a given directory
  const buildPrompt = useCallback((dir) => {
    return `~${dir === '/' ? '' : dir} $ `;
  }, []);

  // Push a plain output entry
  const pushOutput = useCallback((command, output, flags = {}) => {
    dispatch({
      type: 'PUSH',
      entry: { type: 'output', command, output, ...flags },
    });
  }, []);

  // ── Execute a (possibly &&-chained) command string ───────────────────────────
  const executeChain = useCallback((rawFull, dir, echoCommand = true) => {
    const segments = rawFull.split('&&').map(s => s.trim()).filter(Boolean);
    let localDir = dir;
    let isFirst = true;

    for (const segment of segments) {
      const result = runCommand(segment, localDir);

      if (result.url) {
        window.open(result.url, '_blank', 'noopener,noreferrer');
        pushOutput(
          echoCommand && isFirst ? rawFull : null,
          result.output,
          { prompt: buildPrompt(localDir) }
        );
        isFirst = false;
        continue;
      }

      if (result.isNL) {
        // Echo the original input + the inferred command in yellow italic
        pushOutput(
          echoCommand && isFirst ? rawFull : null,
          `→ ${result.resolvedCommand}`,
          { isNL: true, prompt: buildPrompt(localDir) }
        );
        // Run the resolved command chain without echoing (already shown above)
        executeChain(result.resolvedCommand, localDir, false);
        return;
      }

      if (result.isClear) {
        dispatch({ type: 'CLEAR' });
        setCurrentDir('/');
        return;
      }

      if (result.isContact) {
        pushOutput(
          echoCommand && isFirst ? rawFull : null,
          'Starting contact form — press Escape at any time to cancel.',
          { prompt: buildPrompt(localDir) }
        );
        setContact({ step: 'name', data: {} });
        return;
      }

      // Only push an entry if there's a command echo or output to show
      if ((echoCommand && isFirst) || result.output !== null) {
        pushOutput(
          echoCommand && isFirst ? rawFull : null,
          result.output,
          { isError: result.isError, prompt: buildPrompt(localDir) }
        );
      }

      if (result.cdTo !== null) {
        localDir = result.cdTo;
      }
      isFirst = false;
    }

    setCurrentDir(localDir);
  }, [dispatch, pushOutput, buildPrompt, setCurrentDir, setContact]);

  // ── Handle normal command submission ────────────────────────────────────────
  const handleCommand = useCallback((raw) => {
    if (!raw.trim()) return;
    setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);
    executeChain(raw, currentDir);
  }, [executeChain, currentDir]);

  // ── Handle contact form step submission ─────────────────────────────────────
  const handleContactStep = useCallback(async (value) => {
    const { step, data } = contact;
    const prompt = buildPrompt(currentDir);

    if (step === 'name') {
      if (!value.trim()) {
        pushOutput(null, 'Name cannot be empty. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.name + value, null, { prompt });
      setContact({ step: 'email', data: { ...data, name: value.trim() } });

    } else if (step === 'email') {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      if (!emailOk) {
        pushOutput(null, 'Invalid email address. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.email + value, null, { prompt });
      setContact({ step: 'message', data: { ...data, email: value.trim() } });

    } else if (step === 'message') {
      if (!value.trim()) {
        pushOutput(null, 'Message cannot be empty. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.message + value, null, { prompt });
      const newData = { ...data, message: value.trim() };
      setContact({ step: 'confirm', data: newData });
      pushOutput(null,
`┌─────────────────────────────────────┐
│           MESSAGE SUMMARY           │
├─────────────────────────────────────┤
│  Name   : ${newData.name.substring(0, 27).padEnd(27)}│
│  Email  : ${newData.email.substring(0, 27).padEnd(27)}│
│  Message: ${newData.message.substring(0, 27).padEnd(27)}│${newData.message.length > 27 ? `
│           ${newData.message.substring(27, 54).padEnd(27)}│` : ''}
└─────────────────────────────────────┘`
      );

    } else if (step === 'confirm') {
      const ans = value.trim().toLowerCase();
      pushOutput(CONTACT_PROMPTS.confirm + value, null, { prompt });

      if (ans === 'y' || ans === 'yes') {
        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (res.ok) {
            pushOutput(null, '✓ Message sent! I\'ll get back to you soon.', { isSuccess: true });
          } else {
            pushOutput(null, '✗ Failed to send. Please email nicho.delmo@gmail.com directly.', { isError: true });
          }
        } catch {
          pushOutput(null, '✗ Network error. Please email nicho.delmo@gmail.com directly.', { isError: true });
        }
        setContact(null);
      } else if (ans === 'n' || ans === 'no') {
        pushOutput(null, 'Message cancelled.');
        setContact(null);
      } else {
        pushOutput(null, 'Please enter y or n.');
      }
    }
  }, [contact, currentDir, pushOutput, buildPrompt]);

  // ── Keyboard handler ─────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input;
      setInput('');

      if (contact) {
        handleContactStep(val);
      } else {
        handleCommand(val);
      }

    } else if (e.key === 'Escape') {
      if (contact) {
        setContact(null);
        setInput('');
        pushOutput(null, 'Contact form cancelled.');
      }

    } else if (e.key === 'ArrowUp' && !contact) {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] || '');

    } else if (e.key === 'ArrowDown' && !contact) {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx] || '');
    }
  }, [input, contact, handleContactStep, handleCommand, cmdHistory, historyIdx, pushOutput]);

  // ── Derive current prompt text ───────────────────────────────────────────────
  const currentPrompt = contact
    ? CONTACT_PROMPTS[contact.step]
    : buildPrompt(currentDir);

  return (
    <Wrapper onClick={() => inputRef.current?.focus()}>
      <TerminalHeader currentDir={currentDir} />
      <ScrollArea ref={scrollRef}>
        <HistoryBlock history={history} />
        {contact && (
          <ContactPrompt>
            {`[contact] step: ${contact.step} — press Escape to cancel`}
          </ContactPrompt>
        )}
        <InputLine
          value={input}
          prompt={currentPrompt}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
      </ScrollArea>
    </Wrapper>
  );
}
