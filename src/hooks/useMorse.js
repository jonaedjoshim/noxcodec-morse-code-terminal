import { useState, useCallback, useRef } from 'react';
import { textToMorse, morseToText, generateShareURL } from '../utils/morseUtils';
import { useLocalStorage } from './useLocalStorage';

const MAX_LOGS = 5;

export function useMorse(initialText = '') {
  const [plainText, setPlainText] = useState(initialText);
  const [morseText, setMorseText] = useState(
    initialText ? textToMorse(initialText) : ''
  );
  const [mode, setMode] = useState('textToMorse');
  const [toast, setToast] = useState(null);
  const [logs, setLogs] = useLocalStorage('transmission_logs', []);
  const logTimer = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const saveLog = useCallback(
    (plain, morse) => {
      if (!plain.trim()) return;
      const entry = {
        id: Date.now(),
        plain: plain.trim(),
        morse: morse.trim(),
        timestamp: new Date().toISOString(),
      };
      setLogs((prev) => {
        const updated = [entry, ...prev.filter((l) => l.plain !== plain.trim())];
        return updated.slice(0, MAX_LOGS);
      });
    },
    [setLogs]
  );

  const handlePlainChange = useCallback(
    (value) => {
      setPlainText(value);
      const morse = textToMorse(value);
      setMorseText(morse);
      clearTimeout(logTimer.current);
      logTimer.current = setTimeout(() => {
        if (value.trim()) saveLog(value, morse);
      }, 1500);
    },
    [saveLog]
  );

  const handleMorseChange = useCallback(
    (value) => {
      setMorseText(value);
      const plain = morseToText(value);
      setPlainText(plain);
      clearTimeout(logTimer.current);
      logTimer.current = setTimeout(() => {
        if (plain.trim()) saveLog(plain, value);
      }, 1500);
    },
    [saveLog]
  );

  const handleSwapMode = useCallback(() => {
    setMode((prev) => (prev === 'textToMorse' ? 'morseToText' : 'textToMorse'));
  }, []);

  const handleCopy = useCallback(
    (text, label = 'Transmission') => {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        showToast(`${label} copied to clipboard.`);
      });
    },
    [showToast]
  );

  const handleClear = useCallback(() => {
    setPlainText('');
    setMorseText('');
  }, []);

  const handleGenerateLink = useCallback(() => {
    const source = mode === 'textToMorse' ? plainText : morseToText(morseText);
    if (!source.trim()) {
      showToast('Encode a message first, Agent.', 'error');
      return;
    }
    const url = generateShareURL(source);
    navigator.clipboard.writeText(url).then(() => {
      showToast('Secret link generated & copied!');
    });
  }, [mode, plainText, morseText, showToast]);

  const handleLoadLog = useCallback((log) => {
    setPlainText(log.plain);
    setMorseText(log.morse);
    setMode('textToMorse');
  }, []);

  const handleClearLogs = useCallback(() => {
    setLogs([]);
    showToast('Transmission logs wiped.');
  }, [setLogs, showToast]);

  return {
    plainText,
    morseText,
    mode,
    toast,
    logs,
    handlePlainChange,
    handleMorseChange,
    handleSwapMode,
    handleCopy,
    handleClear,
    handleGenerateLink,
    handleLoadLog,
    handleClearLogs,
    showToast,
  };
}