import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_WPM = 15;
const MIN_WPM = 5;
const MAX_WPM = 30;
const TONE_FREQUENCY = 600;
const MAX_SYMBOLS = 1500;

function createSignalTimeline(morse, unit) {
  const tokens = morse
    .replace(/[·•]/g, ".")
    .replace(/[—–−]/g, "-")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.some((token) => token !== "/" && !/^[.-]+$/.test(token))) {
    throw new Error("Invalid Morse signal.");
  }

  const timeline = [];
  let position = 0;
  let previousWasSignal = false;
  let wordBoundary = false;

  for (const token of tokens) {
    if (token === "/") {
      if (previousWasSignal) {
        wordBoundary = true;
      }

      continue;
    }

    if (previousWasSignal) {
      position += wordBoundary ? unit * 7 : unit * 3;
    }

    for (let index = 0; index < token.length; index++) {
      if (index > 0) {
        position += unit;
      }

      const duration = token[index] === "." ? unit : unit * 3;

      timeline.push({
        start: position,
        duration,
      });

      position += duration;
    }

    previousWasSignal = true;
    wordBoundary = false;
  }

  return {
    timeline,
    duration: position,
  };
}

export function useMorseAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSignalActive, setIsSignalActive] = useState(false);
  const [speed, setSpeed] = useState(DEFAULT_WPM);
  const [error, setError] = useState("");

  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const timersRef = useRef([]);
  const playbackIdRef = useRef(0);

  const cleanupPlayback = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    oscillatorsRef.current.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // Oscillator may already be stopped.
      }
    });

    oscillatorsRef.current = [];

    const context = audioContextRef.current;
    audioContextRef.current = null;

    if (context && context.state !== "closed") {
      context.close().catch(() => {});
    }
  }, []);

  const stop = useCallback(() => {
    playbackIdRef.current += 1;

    cleanupPlayback();

    setIsPlaying(false);
    setIsSignalActive(false);
  }, [cleanupPlayback]);

  const play = useCallback(
    async (morse) => {
      stop();
      setError("");

      if (typeof morse !== "string" || !morse.trim()) {
        setError("No Morse signal available.");
        return;
      }

      if (typeof window === "undefined") {
        return;
      }

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        setError("Web Audio API is not supported.");
        return;
      }

      const normalizedMorse = morse
        .replace(/[·•]/g, ".")
        .replace(/[—–−]/g, "-");

      const symbolCount = [...normalizedMorse].filter(
        (character) => character === "." || character === "-",
      ).length;

      if (!symbolCount) {
        setError("Enter valid Morse dots and dashes.");
        return;
      }

      if (symbolCount > MAX_SYMBOLS) {
        setError("Maximum 1500 Morse symbols allowed.");
        return;
      }

      const unit = 1.2 / speed;

      let signalData;

      try {
        signalData = createSignalTimeline(normalizedMorse, unit);
      } catch {
        setError("Invalid Morse signal. Use dots, dashes, and /.");
        return;
      }

      const playbackId = playbackIdRef.current;
      let context;

      try {
        context = new AudioContextClass();
        audioContextRef.current = context;

        await context.resume();

        if (playbackId !== playbackIdRef.current) {
          if (context.state !== "closed") {
            context.close().catch(() => {});
          }

          return;
        }

        const startTime = context.currentTime + 0.08;

        signalData.timeline.forEach(({ start, duration }) => {
          const signalStart = startTime + start;
          const signalEnd = signalStart + duration;

          const oscillator = context.createOscillator();
          const gain = context.createGain();

          oscillator.type = "sine";
          oscillator.frequency.value = TONE_FREQUENCY;

          gain.gain.setValueAtTime(0, signalStart);
          gain.gain.linearRampToValueAtTime(0.18, signalStart + 0.005);

          gain.gain.setValueAtTime(
            0.18,
            Math.max(signalStart + 0.005, signalEnd - 0.005),
          );

          gain.gain.linearRampToValueAtTime(0, signalEnd);

          oscillator.connect(gain);
          gain.connect(context.destination);

          oscillator.start(signalStart);
          oscillator.stop(signalEnd + 0.01);

          oscillatorsRef.current.push(oscillator);

          const onTimer = setTimeout(
            () => {
              if (playbackId === playbackIdRef.current) {
                setIsSignalActive(true);
              }
            },
            Math.max(0, (signalStart - context.currentTime) * 1000),
          );

          const offTimer = setTimeout(
            () => {
              if (playbackId === playbackIdRef.current) {
                setIsSignalActive(false);
              }
            },
            Math.max(0, (signalEnd - context.currentTime) * 1000),
          );

          timersRef.current.push(onTimer, offTimer);
        });

        setIsPlaying(true);

        const endTimer = setTimeout(
          () => {
            if (playbackId === playbackIdRef.current) {
              stop();
            }
          },
          (signalData.duration + 0.2) * 1000,
        );

        timersRef.current.push(endTimer);
      } catch (error) {
        console.error("[NOXCODEC] Audio playback error:", error);

        if (playbackId === playbackIdRef.current) {
          stop();
          setError("Unable to play Morse audio.");
        } else if (context && context.state !== "closed") {
          context.close().catch(() => {});
        }
      }
    },
    [speed, stop],
  );

  const changeSpeed = useCallback(
    (value) => {
      const nextSpeed = Number(value);

      if (
        !Number.isFinite(nextSpeed) ||
        nextSpeed < MIN_WPM ||
        nextSpeed > MAX_WPM
      ) {
        return;
      }

      stop();
      setSpeed(nextSpeed);
    },
    [stop],
  );

  useEffect(() => {
    return () => {
      playbackIdRef.current += 1;
      cleanupPlayback();
    };
  }, [cleanupPlayback]);

  return {
    isPlaying,
    isSignalActive,
    speed,
    error,
    play,
    stop,
    changeSpeed,
  };
}
