import { useState, useCallback, useRef, useEffect } from "react";
import {
  textToMorse,
  morseToText,
  generateShareURL,
} from "../utils/morseUtils";
import morseData from "../data/morseData.json";
import { useLocalStorage } from "./useLocalStorage";

const MAX_LOGS = 5;
const LOG_DEBOUNCE_DELAY = 1500;
const TOAST_DURATION = 3000;
const STORAGE_KEY = "transmission_logs";

export function useMorse(initialText = "") {
  const [plainText, setPlainText] = useState(initialText);
  const [morseText, setMorseText] = useState(() =>
    initialText ? textToMorse(initialText) : "",
  );
  const [mode, setMode] = useState("textToMorse");
  const [toast, setToast] = useState(null);
  const [logs, setLogs] = useLocalStorage(STORAGE_KEY, []);

  const logTimerRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(logTimerRef.current);
      clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = useCallback((message, type = "success") => {
    clearTimeout(toastTimerRef.current);
    setToast({ message, type });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_DURATION);
  }, []);

  const saveLog = useCallback(
    (plain, morse) => {
      const normalizedPlain = plain.trim();
      const normalizedMorse = morse.trim();

      if (!normalizedPlain || !normalizedMorse) return;

      const entry = {
        id: Date.now(),
        plain: normalizedPlain,
        morse: normalizedMorse,
        timestamp: new Date().toISOString(),
      };

      setLogs((previousLogs) => {
        const safeLogs = Array.isArray(previousLogs) ? previousLogs : [];

        const filteredLogs = safeLogs.filter(
          (log) => log.plain !== normalizedPlain,
        );

        return [entry, ...filteredLogs].slice(0, MAX_LOGS);
      });
    },
    [setLogs],
  );

  const cancelPendingLog = useCallback(() => {
    clearTimeout(logTimerRef.current);
    logTimerRef.current = null;
  }, []);

  const scheduleLog = useCallback(
    (plain, morse) => {
      cancelPendingLog();

      if (!plain.trim() || !morse.trim()) return;

      logTimerRef.current = setTimeout(() => {
        saveLog(plain, morse);
        logTimerRef.current = null;
      }, LOG_DEBOUNCE_DELAY);
    },
    [cancelPendingLog, saveLog],
  );

  const handlePlainChange = useCallback(
    (value) => {
      const translatedMorse = textToMorse(value);

      setPlainText(value);
      setMorseText(translatedMorse);
      scheduleLog(value, translatedMorse);
    },
    [scheduleLog],
  );

  const handleMorseChange = useCallback(
    (value) => {
      const translatedText = morseToText(value);

      setMorseText(value);
      setPlainText(translatedText);
      scheduleLog(translatedText, value);
    },
    [scheduleLog],
  );

  const handleReferenceSelect = useCallback(
    (character) => {
      if (mode === "textToMorse") {
        const updatedText = plainText + character;
        handlePlainChange(updatedText);
        return;
      }

      const code = character === " " ? "/" : morseData[character];

      if (!code) return;

      const trimmedMorse = morseText.trimEnd();

      const updatedMorse = trimmedMorse
        ? `${trimmedMorse} ${code} `
        : `${code} `;

      handleMorseChange(updatedMorse);
    },
    [mode, plainText, morseText, handlePlainChange, handleMorseChange],
  );

  const handleSwapMode = useCallback(() => {
    cancelPendingLog();

    setMode((previousMode) =>
      previousMode === "textToMorse" ? "morseToText" : "textToMorse",
    );
  }, [cancelPendingLog]);

  const handleCopy = useCallback(
    async (text, label = "Transmission") => {
      if (!text) {
        showToast("Nothing to copy, Agent.", "error");
        return;
      }

      try {
        if (!navigator.clipboard?.writeText) {
          throw new Error("Clipboard API unavailable");
        }

        await navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard.`);
      } catch (error) {
        console.error("[NOXCODEC] Clipboard error:", error);
        showToast("Failed to copy. Check clipboard permissions.", "error");
      }
    },
    [showToast],
  );

  const handleClear = useCallback(() => {
    cancelPendingLog();
    setPlainText("");
    setMorseText("");
    showToast("Terminal cleared.");
  }, [cancelPendingLog, showToast]);

  const handleGenerateLink = useCallback(async () => {
    const textToEncode =
      mode === "textToMorse" ? plainText : morseToText(morseText);

    if (!textToEncode.trim()) {
      showToast("Enter a message first, Agent.", "error");
      return;
    }

    try {
      const shareURL = generateShareURL(textToEncode);

      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(shareURL);
      showToast("Share link generated and copied!");
    } catch (error) {
      console.error("[NOXCODEC] Share link error:", error);
      showToast("Failed to generate or copy share link.", "error");
    }
  }, [mode, plainText, morseText, showToast]);

  const handleLoadLog = useCallback(
    (log) => {
      if (!log || typeof log !== "object") return;

      if (typeof log.plain !== "string" || typeof log.morse !== "string") {
        showToast("Invalid transmission log.", "error");
        return;
      }

      cancelPendingLog();

      setPlainText(log.plain);
      setMorseText(log.morse);
      setMode("textToMorse");

      showToast("Transmission restored from history.");
    },
    [cancelPendingLog, showToast],
  );

  const handleClearLogs = useCallback(() => {
    cancelPendingLog();
    setLogs([]);
    showToast("Transmission logs wiped.");
  }, [cancelPendingLog, setLogs, showToast]);

  return {
    plainText,
    morseText,
    mode,
    toast,
    logs,
    handlePlainChange,
    handleMorseChange,
    handleReferenceSelect,
    handleSwapMode,
    handleCopy,
    handleClear,
    handleGenerateLink,
    handleLoadLog,
    handleClearLogs,
    showToast,
  };
}
