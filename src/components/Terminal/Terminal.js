import { useState, useReducer, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import TerminalHeader from './TerminalHeader';
import HistoryBlock from './HistoryBlock';
import InputLine from './InputLine';
import { runCommand } from '../../commands/index';
import help from '../../commands/help';

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
  padding: 1rem 1.5rem 0.5rem;
`;

const InputArea = styled.div`
  padding: 0.25rem 1.5rem 1rem;
  border-top: 1px solid ${props => props.theme.mutedText};
  flex-shrink: 0;
`;

const ContactPrompt = styled.div`
  color: ${props => props.theme.accentYellow};
  margin-bottom: 0.25rem;
  font-size: 0.9em;
`;

// ─── Welcome Output ───────────────────────────────────────────────────────────

const WELCOME_TEXT = `Welcome to nicho's portfolio terminal.
Type 'help' to see available commands.
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
  const [cmdHistory, setCmdHistory] = useState([]);   // for up/down arrow
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Contact form state machine: null | { step, data }
  const [contact, setContact] = useState(null);

  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever history changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, contact]);

  // Push a plain output entry
  const pushOutput = useCallback((command, output, flags = {}) => {
    dispatch({
      type: 'PUSH',
      entry: { type: 'output', command, output, ...flags },
    });
  }, []);

  // ── Handle normal command submission ────────────────────────────────────────
  const handleCommand = useCallback((raw) => {
    if (!raw.trim()) return;

    // Save to command history
    setCmdHistory(prev => [raw, ...prev]);
    setHistoryIdx(-1);

    const { output, isClear, isContact } = runCommand(raw);

    if (isClear) {
      dispatch({ type: 'CLEAR' });
      return;
    }

    if (isContact) {
      pushOutput(raw, 'Starting contact form — press Escape at any time to cancel.');
      setContact({ step: 'name', data: {} });
      return;
    }

    pushOutput(raw, output);
  }, [pushOutput]);

  // ── Handle contact form step submission ─────────────────────────────────────
  const handleContactStep = useCallback(async (value) => {
    const { step, data } = contact;

    if (step === 'name') {
      if (!value.trim()) {
        pushOutput(null, 'Name cannot be empty. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.name + value, null);
      setContact({ step: 'email', data: { ...data, name: value.trim() } });

    } else if (step === 'email') {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
      if (!emailOk) {
        pushOutput(null, 'Invalid email address. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.email + value, null);
      setContact({ step: 'message', data: { ...data, email: value.trim() } });

    } else if (step === 'message') {
      if (!value.trim()) {
        pushOutput(null, 'Message cannot be empty. Try again.');
        return;
      }
      pushOutput(CONTACT_PROMPTS.message + value, null);
      const newData = { ...data, message: value.trim() };
      setContact({ step: 'confirm', data: newData });
      // Show summary
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
      pushOutput(CONTACT_PROMPTS.confirm + value, null);

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
  }, [contact, pushOutput]);

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
    : 'nicho@portfolio:~$ ';

  return (
    <Wrapper onClick={() => {}}>
      <TerminalHeader />
      <ScrollArea ref={scrollRef}>
        <HistoryBlock history={history} />
      </ScrollArea>
      <InputArea>
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
        />
      </InputArea>
    </Wrapper>
  );
}
